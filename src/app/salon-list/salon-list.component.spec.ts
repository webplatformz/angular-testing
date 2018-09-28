import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonListComponent } from './salon-list.component';

describe('SalonListComponent', () => {
  let component: SalonListComponent;
  let fixture: ComponentFixture<SalonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
