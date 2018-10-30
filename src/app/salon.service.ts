import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Salon} from './salon';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class SalonService {

  constructor(private httpClient: HttpClient) {
  }

  loadSalons(): Observable<Salon[]> {
    return this.httpClient.get<Salon[]>('api/salons');
  }

  loadShinySalons(): Observable<Salon[]> {
    return this.loadSalons()
      .pipe(map(salons => salons.filter(salon => salon.shiny)))
  }
}
