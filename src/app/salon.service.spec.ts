import {TestBed} from '@angular/core/testing';

import {SalonService} from './salon.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const salon1 = {
  id: 1,
  name: 'Coiffeur blutiges Ohr',
  genderServed: 'female',
  belongsToChain: false,
  shiny: false,
  address: {id: 1, zipCode: '1000', city: 'Genève', country: 'CH'}
};

const salon2 = {
  id: 2,
  name: 'Salon Milde Bleiche',
  genderServed: 'both',
  belongsToChain: false,
  shiny: true,
  address: {id: 2, zipCode: '8000', city: 'St. Gallen', country: 'CH'}
};

describe('SalonService', () => {
  it('should be tested in a simple way without a TestBed', () => {
    const fakeHttpClient = {
      get: () => of([salon1, salon2])
    };
    let salonService = new SalonService(<any>fakeHttpClient);

    salonService.loadSalons().subscribe(salons => {
      expect(salons[0].name).toBe('Coiffeur blutiges Ohr');
    });
  });
});


describe('SalonService', () => {
  it('should be tested with a jasmine spy', () => {
    let spyHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    spyHttpClient.get.and.returnValue(of([salon1, salon2]));

    let salonService = new SalonService(spyHttpClient);

    salonService.loadSalons().subscribe(salons => {
          expect(salons[0].name).toBe('Coiffeur blutiges Ohr');
          expect(spyHttpClient.get.calls.count()).toBe(1);
        });

  });
});

describe('SalonService', () => {
  it('should be tested in the soft bed of Angular', () => {
    let spyHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    spyHttpClient.get.and.returnValue(of([salon1, salon2]));

    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: spyHttpClient}, SalonService]
    });

    let salonService = TestBed.get(SalonService);

    salonService.loadSalons().subscribe(salons => {
          expect(salons[0].name).toBe('Coiffeur blutiges Ohr');
          expect(spyHttpClient.get.calls.count()).toBe(1);
        });
  });
});


describe('SalonService', () => {
  it('should return only the shiny salons', () => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [SalonService]
      }
    );

    TestBed.get(SalonService).loadShinySalons().subscribe(salons => {
      expect(salons[0].name).toBe('Salon Milde Bleiche');
    });

    const httpMock = TestBed.get(HttpTestingController);
    let request = httpMock.expectOne('api/salons');
    request.flush([salon1, salon2]);

    httpMock.verify();
  })
});
