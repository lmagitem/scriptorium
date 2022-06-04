import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Viewport } from 'pixi-viewport';
import { Application, Container, Graphics, Renderer } from 'pixi.js';
import { MapModeEnum } from './enums/map-mode.enum';
import { SectorScene, FULL_WIDTH, FULL_HEIGHT } from './scenes/sector.scene';
import { Store } from '@ngrx/store';
import { ViewportGenerator } from './generators/viewport.generator';

export enum TempSceneType {
  SECTOR,
  SYSTEM,
  PLANET,
  SCENE,
}

export type SceneType =
  | TempSceneType.SECTOR
  | TempSceneType.SYSTEM
  | TempSceneType.PLANET
  | TempSceneType.SCENE;

/** Manages the PIXI app proper. */
@Injectable({
  providedIn: 'root',
})
export class PixiService {
  /** Current PIXI application. */
  private app = new Application();
  /** The div in which the app is displayed. */
  private pixiDiv: ElementRef | undefined;
  /** Is the app launched? */
  private appLaunched = false;
  /** Which kind of scene is currently drawn. */
  private currentScene = new BehaviorSubject<TempSceneType>(
    TempSceneType.SECTOR
  );
  /** Which kind of scene is currently drawn. */
  currentScene$: Observable<TempSceneType> = this.currentScene.asObservable();
  /** The app's renderer. */
  private renderer: Renderer = new Renderer();
  /** The app's main container. */
  private stage: Container = new Container();
  /** The container that transforms when the user zooms or pans. */
  private viewport: Viewport = new Viewport();
  /** The container that contains what is to be drawn in the scene. */
  private game: Container = new Container();
  /** The container that is drawn above the game to show UI elements. */
  private overlay: Container = new Graphics();
  /** The container that contains what is to be drawn in the scene. */
  private sectorScene: SectorScene = new SectorScene();

  constructor(private store: Store) {}

  /** Registers the app and initializes its content. */
  public initManager(app: Application, pixiDiv: ElementRef) {
    this.app = app;
    this.appLaunched = true;

    if (this.app.renderer instanceof Renderer)
      this.renderer = this.app.renderer;
    else
      throw new Error(
        `The pixi app's renderer field does not contain an instance of Renderer.`
      );

    this.stage = this.app.stage;
    this.stage.interactive = true;
    this.pixiDiv = pixiDiv;

    // Initializes the stage
    this.initStage();

    // Launches the scene
    this.changeScene(TempSceneType.SECTOR);
  }

  /** Remembers what the current app size is. */
  updateAppSize(w: number, h: number) {
    this.viewport.screenWidth = w;
    this.viewport.screenHeight = h;
  }

  /** Switches the display to the selected scene. */
  changeScene(scene: SceneType) {
    this.currentScene.next(scene);
    this.launchScene();
  }

  /** Sets a new interaction mode to the current scene. */
  changeMode(mode: MapModeEnum) {
    switch (this.currentScene.getValue()) {
      case TempSceneType.SECTOR:
        this.sectorScene.changeMode(mode);
        break;
      default:
        break;
    }
  }

  /** Creates the overlay, the main container and the viewport (camera). */
  private initStage() {
    this.overlay = new Graphics();
    this.game = new Container();

    // Initializes the viewport
    this.viewport = ViewportGenerator.createViewport(
      FULL_WIDTH,
      FULL_HEIGHT,
      this.app.renderer.width,
      this.app.renderer.height,
      this.renderer
    );

    this.app.stage.addChild(this.viewport);
    this.viewport.addChild(this.game);
    this.stage.addChild(this.overlay);
  }

  /** Launch the selected scene. */
  private launchScene() {
    if (this.appLaunched) {
      switch (this.currentScene.getValue()) {
        case TempSceneType.SECTOR:
          if (!this.sectorScene.isInitialized)
            this.sectorScene.init(this.viewport, this.store);
          this.game.removeChildren(0, this.game.children.length);
          this.game.addChild(this.sectorScene);
          break;
        default:
          break;
      }
    }
  }
}
