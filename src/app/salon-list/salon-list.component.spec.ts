import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SalonListComponent} from './salon-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FilterComponent} from '../filter/filter.component';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {SalonService} from '../salon.service';

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

const salonServiceMock = {
  loadSalons: () => {
    return of([salon1, salon2])
  },
  loadShinySalons: () => {
    return of([salon2])
  }
};


fdescribe('SalonListComponent', () => {
  let component: SalonListComponent;
  let fixture: ComponentFixture<SalonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: SalonService, useValue: salonServiceMock}],
      declarations: [SalonListComponent, FilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply the filter correctly', () => {

    const nativeElement = fixture.nativeElement;
    let inputElement = nativeElement.querySelector('#salon-name-input');

    inputElement.value = 'Bleiche';
    inputElement.dispatchEvent(new Event('input'));

    nativeElement.querySelector('#search-form-submit').click();

    fixture.detectChanges();

    const salonHeaders = fixture.debugElement.queryAll(By.css('.salon-header'));
    expect(salonHeaders.length).toBe(1);
    expect(salonHeaders[0].childNodes[0].nativeNode.textContent).toBe('Salon Milde Bleiche');
  });
});
