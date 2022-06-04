import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Interactable } from 'src/app/model/map/interactable';
import { MapModeEnum } from '../enums/map-mode.enum';

/** A controller for objects that can be interacted with on the map. */
export class InteractableController {
  /** Is this object currently selected? */
  isSelected = false;
  /** Is this object currently hovered? */
  isHovered = false;
  /** What's the current map mode? */
  currentMode = MapModeEnum.VIEW;
  /** This sprite's outline. */
  private outline: Graphics | undefined;

  constructor(
    /** This object's sprite. */
    protected sprite: Sprite,
    /** The container that contains this object's sprite. */
    protected spriteLayer: Container,
    /** A container that is directly below the sprite's one. */
    protected subLayer: Container,
    /** The object itself. */
    protected model: Interactable,
    /** The function this controller will call to alert the scene that it has been selected. */
    protected onSelect: (selected: InteractableController) => void
  ) {
    this.onInit();
  }

  /** Binds mouse events. */
  onInit(): void {
    this.sprite.on('pointerdown', (event) => this.onPointerDown(event));
    this.sprite.on('pointerover', (event) => this.onPointerHover(event));
    this.sprite.on('pointerout', (event) => this.onPointerLeave(event));
    this.sprite.on('pointerup', (event) => this.onPointerUp(event));
  }

  /** Called after a zoom action, scales the sprite if necessary. */
  scaleSprite(zoom: number) {
    const iconUrl = this.model.getSpriteUrl(zoom);
    this.sprite.texture = !!iconUrl ? Texture.from(iconUrl) : Texture.EMPTY;
    this.sprite.scale.x = zoom > 0.5 ? 1 : zoom > 0.25 ? 2 : 3;
    this.sprite.scale.y = zoom > 0.5 ? 1 : zoom > 0.25 ? 2 : 3;
    this.desactivateOutline();
    if (this.isSelected || this.isHovered) {
      this.activateOutline();
    }
  }

  /** Removes the circle from under the sprite to show it's been deselected or the pointer has left its hitbox. */
  desactivateOutline() {
    if (!!this.outline && this.subLayer.children.length > 0) {
      this.subLayer.removeChild(this.outline);
    }
  }

  /** What should happen when a mouse button is pressed. */
  private onPointerDown(event: any): void {
    switch (this.currentMode) {
      case MapModeEnum.VIEW:
        break;
      case MapModeEnum.EDIT:
        console.log(event);
        if (this.isSelected) {
        }
        break;
      default:
        break;
    }
  }

  /** What should happen when the pointer hovers the sprite's hit box. */
  private onPointerHover(event: any): void {
    this.isHovered = true;
    switch (this.currentMode) {
      case MapModeEnum.VIEW:
      case MapModeEnum.EDIT:
        this.activateOutline();
        break;
      default:
        break;
    }
  }

  /** What should happen when the pointer leave the sprite's hit box. */
  private onPointerLeave(event: any): void {
    this.isHovered = false;
    switch (this.currentMode) {
      case MapModeEnum.VIEW:
      case MapModeEnum.EDIT:
        if (!this.isSelected) {
          this.desactivateOutline();
        }
        break;
      default:
        break;
    }
  }

  /** What should happen when a mouse button is released. */
  private onPointerUp(event: any): void {
    switch (this.currentMode) {
      case MapModeEnum.VIEW:
        if (!this.isSelected) {
          this.onSelect(this);
          this.isSelected = true;
          this.activateOutline();
        }
        console.log('SHOW INFOS ABOUT SELECTED OBJECT');
        break;
      case MapModeEnum.EDIT:
        break;
      default:
        break;
    }
  }

  /** Draws a circle under the sprite to show it's been hovered/selected. */
  private activateOutline() {
    if (!!this.outline && this.subLayer.children.length > 0) {
      this.subLayer.removeChild(this.outline);
    }
    this.outline = new Graphics();
    this.outline.beginFill(0xffffff);
    this.outline.drawCircle(0, 0, this.sprite.width * 0.5 + 3);
    this.outline.endFill();
    if (this.subLayer.children.length < 1) {
      this.subLayer.addChild(this.outline);
    }
  }
}
