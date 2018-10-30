import {TestBed} from '@angular/core/testing';
import {SalonListComponent} from './salon-list.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {SalonService} from '../salon.service';
import {of} from 'rxjs';
import {Salon} from '../salon';
import {By} from '@angular/platform-browser';
import {Shallow} from 'shallow-render';
import {AppModule} from '../app.module';

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



describe('SalonListComponent', () => {
  it('should apply the filter correctly', () => {
    TestBed.configureTestingModule({
      providers: [SalonListComponent, FormBuilder, {provide: SalonService, useValue: salonServiceMock}]
    });

    const salonListComponent = TestBed.get(SalonListComponent);
    salonListComponent.ngOnInit();
    salonListComponent.onSearch();

    expect(salonListComponent.displayedSalons.length).toBe(2);
    expect(salonListComponent.displayedSalons[0].name).toBe('Coiffeur blutiges Ohr');

    salonListComponent.searchForm.controls.salonName.value = 'blut';
    salonListComponent.onSearch();

    expect(salonListComponent.displayedSalons.length).toBe(1);
    expect(salonListComponent.displayedSalons[0].name).toBe('Coiffeur blutiges Ohr');

    salonListComponent.searchForm.controls.salonName.value = '';
    salonListComponent.searchForm.controls.gender.value = 'both';
    salonListComponent.onSearch();

    expect(salonListComponent.displayedSalons.length).toBe(1);
    expect(salonListComponent.displayedSalons[0].name).toBe('Salon Milde Bleiche');
  })
});


describe('SalonListComponent', () => {
  it('should write the salons into the DOM', () => {

    @Component({selector: 'app-salon-details', template: ''})
    class SalonDetailsStubComponent {
      @Input() salon: Salon;
    }

    TestBed.configureTestingModule({
      providers: [{provide: SalonService, useValue: salonServiceMock}],
      declarations: [SalonListComponent, SalonDetailsStubComponent],
      imports: [ReactiveFormsModule]
    });

    const fixture = TestBed.createComponent(SalonListComponent);

    fixture.detectChanges();
    const salonHeaders = fixture.debugElement.queryAll(By.css('.salon-header'));

    expect(salonHeaders.length).toBe(2);
    expect(salonHeaders[0].childNodes[0].nativeNode.textContent).toBe('Coiffeur blutiges Ohr');
  })
});

describe('SalonListComponent', () => {
  it('should write the salons into the DOM with custom elements schema', () => {

    TestBed.configureTestingModule({
      providers: [{provide: SalonService, useValue: salonServiceMock}],
      declarations: [SalonListComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    const fixture = TestBed.createComponent(SalonListComponent);
    fixture.detectChanges();

    const salonHeaders = fixture.debugElement.queryAll(By.css('.salon-header'));

    expect(salonHeaders.length).toBe(2);
    expect(salonHeaders[0].childNodes[0].nativeNode.textContent).toBe('Coiffeur blutiges Ohr');

  })
});

describe('SalonListComponent', () => {
  it('should write the salons into the DOM with shallow render', () => {
    let shallow = new Shallow<SalonListComponent>(SalonListComponent, AppModule);

    shallow
      .mock(SalonService, salonServiceMock)
      .dontMock(FormBuilder)
      .render('<app-salon-list></app-salon-list>').then(
      (renderedComponent) => {

        const salonHeaders = renderedComponent.fixture.debugElement.queryAll(By.css('.salon-header'));

        expect(salonHeaders.length).toBe(2);
        expect(salonHeaders[0].childNodes[0].nativeNode.textContent).toBe('Coiffeur blutiges Ohr');
      }
    )
  })
});
