import {Action} from '@ngrx/store';
import {Salon} from '../../../salon';

export enum SalonActionTypes {
  LoadSalons = '[Salon] Load Salons',
  LoadSalonsSuccess = '[Salon] Load Salons Success',
  LoadSalonsFailure = '[Salon] Load Salons Failure'
}

export class LoadSalons implements Action {
  readonly type = SalonActionTypes.LoadSalons;
}

export class LoadSalonsSuccess implements Action {
  readonly type = SalonActionTypes.LoadSalonsSuccess;

  constructor(public salons: Salon[]) {

  }
}

export class LoadSalonsFailure implements Action {
  readonly type = SalonActionTypes.LoadSalonsFailure;

  constructor(public error: any) {

  }
}

export type SalonActions = LoadSalons | LoadSalonsSuccess | LoadSalonsFailure;
