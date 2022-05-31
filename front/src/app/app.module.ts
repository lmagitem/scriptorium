import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { AdminModule } from './components/admin/admin.module';
import { MapModule } from './components/map/map.module';
import { ExplorerModule } from './components/explorer/explorer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule,
    AdminModule,
    MapModule,
    ExplorerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
