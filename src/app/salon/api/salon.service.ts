import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Salon} from '../model/salon';
import {Observable} from 'rxjs';
import {SalonDetails} from '../model/salon-details';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private httpClient: HttpClient) {
  }

  loadSalons(): Observable<Salon[]> {
    return this.httpClient.get<Salon[]>('api/salons');
  }

  loadSalonDetails(salonId: number): Observable<SalonDetails> {
    return this.httpClient.get<SalonDetails>(`api/salons/${salonId}`);
  }
}
