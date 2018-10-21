import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {salonReducer, SalonState} from './salon/salon.reducer';

export interface AppState {
  salonState: SalonState;
}

export const reducers: ActionReducerMap<AppState> = {
  salonState: salonReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
