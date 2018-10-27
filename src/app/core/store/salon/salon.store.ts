import {SalonState} from './salon.reducer';
import {select, Store} from '@ngrx/store';
import {LoadSalonDetails, LoadSalons} from './salon.actions';
import {Observable} from 'rxjs';
import {Salon} from '../../../salon/model/salon';
import {Injectable} from '@angular/core';
import {
  selectSalonDetails,
  selectSalonDetailsLoadingError,
  selectSalons,
  selectSalonsLoaded,
  selectSalonsLoadingError
} from './salon.selectors';
import {distinctUntilChanged, filter, take, withLatestFrom} from 'rxjs/operators';
import {SalonDetails} from '../../../salon/model/salon-details';

@Injectable()
export class SalonStore {

  constructor(private store: Store<SalonState>) {
  }

  getSalons$(): Observable<Salon[]> {
    return this.store.pipe(select(selectSalons));
  }

  getSalonDetails$(): Observable<SalonDetails> {
    return this.store.pipe(select(selectSalonDetails));
  }

  getSalonDetailsLoadingError$(): Observable<boolean> {
    return this.store.pipe(select(selectSalonDetailsLoadingError));
  }

  getSalonsLoadingError$(): Observable<boolean> {
    return this.store.pipe(select(selectSalonsLoadingError));
  }

  loadSalonsAndFirstSalonDetails$() {
    this.store.dispatch(new LoadSalons());
    this.areSalonsLoaded$().pipe(
      distinctUntilChanged(),
      filter(isLoaded => isLoaded),
      take(1),
      withLatestFrom(this.getSalons$())
    ).subscribe(([isLoaded, salons]) => {
      if (salons.length > 0) {
        this.loadSalonDetails$(salons[0].id);
      }
    });
  }

  loadSalonDetails$(salonId: number) {
    this.store.dispatch(new LoadSalonDetails(salonId));
  }

  private areSalonsLoaded$(): Observable<boolean> {
    return this.store.pipe(select(selectSalonsLoaded));
  }
}
