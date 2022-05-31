import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { PixiComponent } from './pixi/pixi.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    LeftPanelComponent,
    MapComponent,
    MenuComponent,
    PixiComponent,
    RightPanelComponent,
  ],
  imports: [CommonModule, MapRoutingModule],
})
export class MapModule {}
