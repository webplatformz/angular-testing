import {createSelector} from '@ngrx/store';
import {SalonState} from './salon.reducer';
import {selectSalonState} from '../app.selectors';

export const selectSalons = createSelector(selectSalonState, (state: SalonState) => state.salons);
export const selectSalonLoadingError = createSelector(selectSalonState, (state: SalonState) => state.isLoadingError);
