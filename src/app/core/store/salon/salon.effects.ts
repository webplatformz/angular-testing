import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoadSalonsFailure, LoadSalonsSuccess, SalonActionTypes} from './salon.actions';
import {SalonService} from '../../../salon.service';
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

  constructor(private actions$: Actions,
              private salonService: SalonService) {
  }
}
