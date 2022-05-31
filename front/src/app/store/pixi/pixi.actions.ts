import { Action } from '@ngrx/store';

export enum PixiActionTypes {
  PIXI_SIZE_CHANGE = '[PIXI] Registering size change',
}

export class PixiSizeChange implements Action {
  public type = PixiActionTypes.PIXI_SIZE_CHANGE;
  constructor(public payload: { width: number; height: number }) {}
}

export type PixiActions = PixiSizeChange;
