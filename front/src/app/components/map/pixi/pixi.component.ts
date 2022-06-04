import { AfterViewInit, Component, ElementRef, NgZone } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Application } from 'pixi.js';
import { PixiService } from 'src/app/service/pixi/pixi.service';
import { SubSink } from 'subsink';
import { getPixiSize } from '../../../store/pixi/index';

/** The component that contains the pixi app. Mainly tasked with creating and resizing. */
@Component({
  selector: 'map-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.less'],
})
export class PixiComponent implements AfterViewInit {
  /** Subscription management. */
  private subs = new SubSink();
  /** The pixi Application. */
  private app?: Application;

  constructor(
    private pixiDiv: ElementRef,
    private zone: NgZone,
    private pixiService: PixiService,
    private store: Store
  ) {}

  /** Once the angular app has been loaded, creates the pixi application and adds it to the webpage. */
  public ngAfterViewInit(): void {
    this.launchApp();
  }

  /** Creates the pixi application and adds it to the webpage. */
  private launchApp() {
    this.zone.runOutsideAngular((): void => {
      this.app = new Application({ antialias: true });
      this.pixiDiv.nativeElement.appendChild(this.app.view);
      this.app.render();
      this.pixiService.initManager(this.app, this.pixiDiv);

      this.subs.sink = this.store
        .pipe(select(getPixiSize))
        .subscribe((size: { width: number; height: number }) => 
          this.resizeApp(size.width, size.height));

      this.pixiDiv.nativeElement.focus();
    });
  }

  /** Resizes the app using its div values. */
  private resizeApp(w: number, h: number) {
    if (this.app !== undefined) {
      // Resize the app
      this.app.renderer.resize(w, h);

      // Center content
      // this.app.stage.position.x = this.app.renderer.width / 2;
      // this.app.stage.position.y = this.app.renderer.height / 2;

      // Save the data
      this.pixiService.updateAppSize(w, h);
    }
  }
}
