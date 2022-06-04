import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppStore from './store/app/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private store: Store) {}

  /** Initializes the app size. */
  ngOnInit(): void {
    this.dispatchAppSizeChange();
  }

  /** Updates the app size with footer size. */
  ngAfterViewInit(): void {
    setTimeout(() => this.dispatchAppSizeChange());
  }

  /** Called every time the window is resized. */
  @HostListener('window:resize', ['$event']) onResize(_event: any) {
    this.dispatchAppSizeChange();
  }

  /** Updates width and height in the app state. */
  private dispatchAppSizeChange() {
    const footer = document.getElementById('map-footer');
    this.store.dispatch(
      new AppStore.AppSizeChange({
        width: window.innerWidth,
        height: window.innerHeight,
        footerHeight: footer?.offsetHeight || 0,
      })
    );
  }
}
