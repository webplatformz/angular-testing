import {createSelector} from '@ngrx/store';
import {SalonState} from './salon.reducer';
import {selectSalonState} from '../app.selectors';

export const selectSalons = createSelector(selectSalonState, (state: SalonState) => state.salons);
export const selectSalonDetails = createSelector(selectSalonState, (state: SalonState) => state.salonDetails);
export const selectSalonDetailsLoadingError = createSelector(
  selectSalonState,
  (state: SalonState) => state.isSalonDetailsLoadingError && !state.areSalonDetailsLoading
);
export const selectSalonsLoadingError = createSelector(
  selectSalonState,
  (state: SalonState) => state.isSalonsLoadingError && !state.areSalonsLoading
);
export const selectSalonsLoaded = createSelector(selectSalonState, (state: SalonState) => state.areSalonsLoaded);
