import { Viewport } from 'pixi-viewport';
import { Renderer } from 'pixi.js';

export class ViewportGenerator {
  /** Creates and initializes the viewport that enables to move and zoom. */
  public static createViewport(
    worldWidth: number,
    worldHeight: number,
    screenWidth: any,
    screenHeight: any,
    renderer: Renderer
  ): Viewport {
    return new Viewport({
      // world width used by viewport (automatically calculated based on container width)
      worldWidth,
      // world height used by viewport (automatically calculated based on container height)
      worldHeight,
      // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
      passiveWheel: false,
      // InteractionManager, available from instantiated WebGLRenderer/CanvasRenderer.plugins.interaction - used to calculate pointer position relative to canvas location on screen
      interaction: renderer.plugins.interaction,
      ...{
        // screen width used by viewport (eg, size of canvas)
        screenWidth,
        // screen height used by viewport (eg, size of canvas)
        screenHeight,
        // div to attach the wheel event (uses document.body as default)
        // divWheel: this.pixiDiv?.nativeElement,
        // number of pixels to move to trigger an input event (e.g., drag, pinch) or disable a clicked event
        // threshold: 5,
        // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
        // stopPropagation: false,
        // change the default hitArea from world size to a new value
        // forceHitArea: null,
        // set this if you want to manually call update() function on each frame
        // noTicker: false,
        // use this PIXI.ticker for updates
        // ticker: PIXI.Ticker.shared,
        // remove oncontextmenu=() => {} from the divWheel element
        // disableOnContextMenu: false,
      },
    })
      .drag({
        // direction: 'all',                // (x, y, or all) direction to drag
        // pressDrag: true,                 // whether click to drag is active
        // wheel: true,                     // use wheel to scroll in direction (unless wheel plugin is active)
        // wheelScroll: 1,                  // number of pixels to scroll with each wheel spin
        // reverse: false,                  // reverse the direction of the wheel scroll
        // clampWheel: false,               // clamp wheel (to avoid weird bounce with mouse wheel)
        // underflow: 'center',             // (top-left, top-center, etc.) where to place world if too small for screen
        // factor: 1,                       // factor to multiply drag to increase the speed of movement
        // mouseButtons: 'all',             // changes which mouse buttons trigger drag, use: 'all', 'left', right' 'middle', or some combination, like, 'middle-right';
        //                                     you may want to set this.viewport.options.disableOnContextMenu if you want to use right-click dragging
        // keyToPress: null,                // array containing https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code codes of keys that can be pressed for the drag
        //                                     to be triggered, e.g.: ['ShiftLeft', 'ShiftRight'}
        // ignoreKeyToPressOnTouch: false,  // ignore keyToPress for touch events
        // lineHeight: 20,                  // scaling factor for non-DOM_DELTA_PIXEL scrolling events (used for firefox mouse scrolling)
      })
      .decelerate({
        // friction: 0.95,              // percent to decelerate after movement
        // bounce: 0.8,                 // percent to decelerate when past boundaries (only applicable when this.viewport.bounce() is active)
        // minSpeed: 0.01,              // minimum velocity before stopping/reversing acceleration
      })
      .pinch({
        // noDrag: false,               // disable two-finger dragging
        // percent: 1,                  // percent to modify pinch speed
        // factor: 1,                   // factor to multiply two-finger drag to increase the speed of movement
        // center: null,                // place this point at center during zoom instead of center of two fingers
        // axis: 'all',                 // axis to zoom
      })
      .wheel({
        percent: 1, // smooth the zooming by providing the number of frames to zoom between wheel spins
        // interrupt: true,             // stop smoothing with any user input on the viewport
        // reverse: false,              // reverse the direction of the scroll
        // center: null,                // place this point at center during zoom instead of current mouse position
        // lineHeight: 20,	            // scaling factor for non-DOM_DELTA_PIXEL scrolling events
        // axis: 'all',                 // axis to zoom
      })
      .clamp({
        // (all, x, or y) using clamps of [0, this.viewport.worldWidth / this.viewport.worldHeight]; replaces left / right / top / bottom if set
        direction: 'all',
      })
      .clampZoom({ maxScale: 1 })
      .setZoom(0.2);
  }
}
