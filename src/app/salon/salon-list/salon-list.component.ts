import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalonService} from '../api/salon.service';
import {Salon} from '../model/salon';
import {FormBuilder} from '@angular/forms';
import {SalonStore} from '../../core/store/salon/salon.store';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SalonDetails} from '../model/salon-details';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit, OnDestroy {
  searchForm;

  displayedSalons: Salon[];
  salonDetails: SalonDetails;
  salonsLoadingError$: Observable<boolean>;
  salonDetailsLoadingError$: Observable<boolean>;
  selectedSalonId: number;

  private alive = true;
  private allSalons: Salon[];

  constructor(private fb: FormBuilder, private salonService: SalonService, private salonStore: SalonStore) {
    this.salonStore.getSalons$().pipe(takeWhile(() => this.alive)).subscribe(salons => {
      this.allSalons = salons;
      this.displayedSalons = salons;
    });
    this.salonStore.getSalonDetails$().pipe(takeWhile(() => this.alive)).subscribe(salonDetails => {
      this.salonDetails = salonDetails;
    });
    this.salonsLoadingError$ = this.salonStore.getSalonsLoadingError$();
    this.salonDetailsLoadingError$ = this.salonStore.getSalonDetailsLoadingError$();
    this.searchForm = fb.group({
      'salonName': [],
      'gender': []
    });
  }

  ngOnInit() {
    this.salonStore.loadSalonsAndFirstSalonDetails$();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onSearch() {
    this.selectedSalonId = undefined;
    const salonName = this.searchForm.controls.salonName.value;
    const gender = this.searchForm.controls.gender.value;
    this.applyFilter(salonName, gender);
  }

  showSalonDetails(salonId: number) {
    this.selectedSalonId = salonId;
    this.salonStore.loadSalonDetails$(salonId);
  }

  private applyFilter(salonName, gender) {
    this.displayedSalons = this.allSalons.filter(salon => {
      const salonNameMatch = !salonName || salon.name.includes(salonName);
      const genderMatch = !gender || salon.genderServed === gender || salon.genderServed === 'both';
      return salonNameMatch && genderMatch;
    });
  }
}
