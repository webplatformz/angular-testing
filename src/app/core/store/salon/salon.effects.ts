import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  LoadSalonDetails,
  LoadSalonDetailsFailure,
  LoadSalonDetailsSuccess,
  LoadSalonsFailure,
  LoadSalonsSuccess,
  SalonActionTypes
} from './salon.actions';
import {SalonService} from '../../../salon/api/salon.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SalonEffects {

  @Effect()
  loadSalons$: Observable<Action> = this.actions$.pipe(
    ofType(SalonActionTypes.LoadSalons),
    switchMap(() => {
      return this.salonService.loadSalons().pipe(
        map(salons => new LoadSalonsSuccess(salons)),
        catchError(error => of(new LoadSalonsFailure(error)))
      );
    })
  );

  @Effect()
  loadSalonDetails$: Observable<Action> = this.actions$.pipe(
    ofType(SalonActionTypes.LoadSalonDetails),
    switchMap(action => {
      const loadSalonDetailsAction = action as LoadSalonDetails;
      return this.salonService.loadSalonDetails(loadSalonDetailsAction.salonId).pipe(
        map(salonDetails => new LoadSalonDetailsSuccess(salonDetails)),
        catchError(error => of(new LoadSalonDetailsFailure(error)))
      );
    })
  );

  constructor(private actions$: Actions,
              private salonService: SalonService) {
  }
}
