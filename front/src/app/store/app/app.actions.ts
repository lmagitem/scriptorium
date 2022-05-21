import { Action } from '@ngrx/store';

export enum AppActionTypes {
  APP_SIZE_CHANGE = '[APP] Registering size change',
}

export class AppSizeChange implements Action {
  public type = AppActionTypes.APP_SIZE_CHANGE;
  constructor(public payload: { width: number; height: number }) {}
}

export type AppActions = AppSizeChange;
