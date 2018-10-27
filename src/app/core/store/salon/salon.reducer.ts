import {Salon} from '../../../salon/model/salon';
import {SalonActions, SalonActionTypes} from './salon.actions';
import {SalonDetails} from '../../../salon/model/salon-details';

export interface SalonState {
  salons: Salon[];
  salonDetails?: SalonDetails;
  areSalonsLoading: boolean;
  isSalonsLoadingError: boolean;
  areSalonsLoaded: boolean;
  areSalonDetailsLoading: boolean;
  isSalonDetailsLoadingError: boolean;
  areSalonDetailsLoaded: boolean;
}

export const initialState: SalonState = {
  salons: [],
  areSalonsLoading: false,
  isSalonsLoadingError: false,
  areSalonsLoaded: false,
  areSalonDetailsLoading: false,
  isSalonDetailsLoadingError: false,
  areSalonDetailsLoaded: false
};

export function salonReducer(state = initialState, action: SalonActions): SalonState {
  switch (action.type) {
    case SalonActionTypes.LoadSalonDetails:
      return {...state, areSalonDetailsLoading: true, areSalonDetailsLoaded: false};
    case SalonActionTypes.LoadSalonDetailsSuccess:
      return {...state, areSalonDetailsLoading: false, areSalonDetailsLoaded: true, salonDetails: action.salonDetails};
    case SalonActionTypes.LoadSalonDetailsFailure:
      return {...state, areSalonDetailsLoading: false, isSalonDetailsLoadingError: true, salonDetails: null};
    case SalonActionTypes.LoadSalons:
      return {...state, areSalonsLoading: true, areSalonsLoaded: false};
    case SalonActionTypes.LoadSalonsSuccess:
      return {
        ...state,
        areSalonsLoading: false,
        areSalonsLoaded: true,
        isSalonsLoadingError: false,
        salons: action.salons
      };
    case SalonActionTypes.LoadSalonsFailure:
      return {...state, areSalonsLoading: false, isSalonsLoadingError: true, salons: []};
    default:
      return state;
  }
}
