import {Salon} from '../../../salon';
import {SalonActions, SalonActionTypes} from './salon.actions';

export interface SalonState {
  salons: Salon[];
  isLoading: boolean;
  isLoadingError: boolean;
  isLoaded: boolean;
}

export const initialState: SalonState = {
  salons: [],
  isLoading: false,
  isLoadingError: false,
  isLoaded: false
};

export function salonReducer(state = initialState, action: SalonActions): SalonState {
  switch (action.type) {
    case SalonActionTypes.LoadSalons:
      return {...state, isLoading: true, isLoaded: false};
    case SalonActionTypes.LoadSalonsSuccess:
      return {...state, isLoading: false, isLoaded: true, isLoadingError: false, salons: action.salons};
    case SalonActionTypes.LoadSalonsFailure:
      return {...state, isLoading: false, isLoadingError: true};
    default:
      return state;
  }
}
