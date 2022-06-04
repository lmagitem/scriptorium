import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAppSize } from 'src/app/store/app';
import { getPixiSize } from 'src/app/store/pixi';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
})
export class MapComponent implements OnInit {
  /** Subscription management. */
  private subs = new SubSink();
  /** Full inner width of browser window. */
  public width = window.innerWidth;
  /** Full inner height of browser window. */
  public height = window.innerHeight;
  /** Expected width of pixi app. */
  public pixiWidth = window.innerWidth;
  /** Expected height of pixi app. */
  public pixiHeight = window.innerHeight;

  constructor(private store: Store) {}

  /** Subscribes to app size in order to be notified each time the window size changes. */
  ngOnInit(): void {
    this.subs.sink = this.store
      .pipe(select(getAppSize))
      .subscribe((size: { width: number; height: number }) => {
        this.width = size.width;
        this.height = size.height;
      });
    this.subs.sink = this.store
      .pipe(select(getPixiSize))
      .subscribe((size: { width: number; height: number }) => {
        this.pixiWidth = size.width;
        this.pixiHeight = size.height;
      });
  }
}
