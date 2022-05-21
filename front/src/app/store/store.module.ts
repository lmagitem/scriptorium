import { NgModule } from '@angular/core';
import {
  StoreModule as NgRxStoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { stateReducers } from './reducers';
import { metaReducers } from './meta-reducers';

@NgModule({
  imports: [
    NgRxStoreModule.forRoot(stateReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  declarations: [],
  exports: [],
  providers: [],
})
export class StoreModule {}
