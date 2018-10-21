import {createFeatureSelector} from '@ngrx/store';
import {SalonState} from './salon/salon.reducer';

export const selectSalonState = createFeatureSelector<SalonState>('salonState');
