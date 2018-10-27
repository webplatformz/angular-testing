import {Action} from '@ngrx/store';
import {Salon} from '../../../salon/model/salon';
import {SalonDetails} from '../../../salon/model/salon-details';

export enum SalonActionTypes {
  LoadSalons = '[Salon] Load Salons',
  LoadSalonsSuccess = '[Salon] Load Salons Success',
  LoadSalonsFailure = '[Salon] Load Salons Failure',
  LoadSalonDetails = '[Salon] Load Salon Details',
  LoadSalonDetailsSuccess = '[Salon] Load Salon Details Success',
  LoadSalonDetailsFailure = '[Salon] Load Salon Details Failure'
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

export class LoadSalonDetails implements Action {
  readonly type = SalonActionTypes.LoadSalonDetails;

  constructor(public salonId: number) {

  }
}

export class LoadSalonDetailsSuccess implements Action {
  readonly type = SalonActionTypes.LoadSalonDetailsSuccess;

  constructor(public salonDetails: SalonDetails) {

  }
}

export class LoadSalonDetailsFailure implements Action {
  readonly type = SalonActionTypes.LoadSalonDetailsFailure;

  constructor(public error: any) {

  }
}

export type SalonActions =
  LoadSalons
  | LoadSalonsSuccess
  | LoadSalonsFailure
  | LoadSalonDetails
  | LoadSalonDetailsSuccess
  | LoadSalonDetailsFailure;
