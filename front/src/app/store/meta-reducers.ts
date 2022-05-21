import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { stateReducers } from './reducers';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: Object.keys(stateReducers),
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<any, any>[] = [localStorageSyncReducer];