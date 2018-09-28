import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailsComponent } from './salon-details.component';

describe('SalonDetailsComponent', () => {
  let component: SalonDetailsComponent;
  let fixture: ComponentFixture<SalonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
