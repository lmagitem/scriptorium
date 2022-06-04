import { Store } from '@ngrx/store';
import { Container } from '@pixi/display';
import { Viewport } from 'pixi-viewport';
import { Sprite, System, Texture } from 'pixi.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Interactable } from 'src/app/model/map/interactable';
import { InteractableController } from '../controllers/interactable.controller';
import { MapMode, MapModeEnum } from '../enums/map-mode.enum';
import { BackgroundGenerator } from '../generators/background.generator';

const MAP_OFFSET = 56;
const WORLD_WIDTH = 8192;
const WORLD_HEIGHT = 4096;
const CELL_SIZE = 34;
const X_CELLS = 240;
const Y_CELLS = 120;
export const FULL_WIDTH = WORLD_WIDTH + MAP_OFFSET * 2;
export const FULL_HEIGHT = WORLD_HEIGHT + MAP_OFFSET * 2;

/** Container for the sector scene. */
export class SectorScene extends Container {
  /** Is the scene initialized? */
  public isInitialized = false;
  /** Bottom layer. */
  private backgroundContainer: Container = new Container();
  /** Middle layer. */
  private gridContainer: Container = new Container();
  /** Top layer. */
  private systemContainer: Container = new Container();
  /** This scene's interactable objects controllers. */
  private controllers: InteractableController[] = [];
  /** Which mode the interface is currently in. */
  private currentMode = new BehaviorSubject<MapMode>(MapModeEnum.VIEW);
  /** Which mode the interface is currently in. */
  currentMode$: Observable<MapMode> = this.currentMode.asObservable();
  /** Which mode the interface is currently in. */
  private selectedObject = new BehaviorSubject<
    any | undefined
  >(undefined);
  /** Which mode the interface is currently in. */
  selectedObject$: Observable<any | undefined> =
    this.selectedObject.asObservable();

  /** Initializes the scene. */
  public init(viewport: Viewport, store: Store) {
    if (!this.isInitialized) {
      this.addChild(this.backgroundContainer);
      this.addChild(this.gridContainer);
      this.addChild(this.systemContainer);

      // Adding the background
      const background = new Sprite(
        Texture.from('assets/mapmaking/sector-map.jpg')
      );
      background.position.set(0, 0);
      background.scale.set(1);
      this.backgroundContainer.addChild(background);

      // Adding the sector grid
      const grid = BackgroundGenerator.generateGrid(
        CELL_SIZE,
        X_CELLS,
        Y_CELLS,
        0x1d1d1d,
        0x222222,
        0x292929,
        0x3e3229,
        true,
        true,
        true,
        true
      );
      grid.setTransform(
        (FULL_WIDTH - CELL_SIZE * X_CELLS) * 0.5,
        (FULL_HEIGHT - CELL_SIZE * Y_CELLS) * 0.5
      );
      this.gridContainer.addChild(grid);

      /**
      // Adding all sprites
      state$.pipe(first()).subscribe((state) => {
        const zoom = viewport.scale.x;
        state.map.systems.forEach((system: Interactable) => {
          // Create the container and put it in place
          const spriteContainer = new Container();
          spriteContainer.setTransform(
            system.position.x + MAP_OFFSET + CELL_SIZE * 2,
            system.position.y + MAP_OFFSET + CELL_SIZE
          );

          // Create the sprite
          const assetUrl = system.getSpriteUrl();
          const sprite: Sprite = new Sprite(
            !!assetUrl ? Texture.from(assetUrl) : Texture.EMPTY
          );
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;
          sprite.interactive = true;

          // Order everything properly
          const spriteSubLayer = new Container();
          spriteContainer.addChild(spriteSubLayer);
          spriteContainer.addChild(sprite);
          this.systemContainer.addChild(spriteContainer);

          // And register a controller
          const systemController = new SystemController(
            sprite,
            spriteContainer,
            spriteSubLayer,
            system as System,
            // Function called when the object is selected. Register the action and deselect everything else.
            (selected: InteractableController) => {
              this.selectedObject.next(selected);
              this.controllers.forEach((c) => {
                if (c !== this.selectedObject.getValue()) {
                  c.isSelected = false;
                  if (!c.isHovered) {
                    c.desactivateOutline();
                  }
                }
              });
            },
            mapService
          );
          systemController.scaleSprite(zoom);
          this.controllers.push(systemController);
        });
      }); 
      */

      // On zoom, change the sprites' sizes
      viewport.on('zoomed-end', () =>
        this.controllers.forEach((controller) =>
          controller.scaleSprite(viewport.scale.x)
        )
      );

      this.isInitialized = true;
    }
  }

  /** Sets a new interaction mode to the scene. */
  changeMode(mode: MapModeEnum) {
    this.currentMode.next(mode);
    this.controllers.forEach((c) => (c.currentMode = mode));
  }
}
