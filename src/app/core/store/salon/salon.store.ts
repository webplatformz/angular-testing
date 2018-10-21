import {SalonState} from './salon.reducer';
import {select, Store} from '@ngrx/store';
import {LoadSalons} from './salon.actions';
import {Observable} from 'rxjs';
import {Salon} from '../../../salon';
import {Injectable} from '@angular/core';
import {selectSalonLoadingError, selectSalons} from './salon.selectors';

@Injectable()
export class SalonStore {

  constructor(private store: Store<SalonState>) {
  }

  getSalons$(): Observable<Salon[]> {
    return this.store.pipe(select(selectSalons));
  }

  getSalonLoadingError$(): Observable<boolean> {
    return this.store.pipe(select(selectSalonLoadingError));
  }

  loadSalons$() {
    this.store.dispatch(new LoadSalons());
  }
}
