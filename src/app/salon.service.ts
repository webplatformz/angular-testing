import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Salon} from './salon';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

  constructor(private httpClient: HttpClient) {
  }

  loadSalons() {
    return this.httpClient.get<Salon[]>('api/salons');
  }
}
