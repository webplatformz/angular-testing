import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalonService} from '../salon.service';
import {Salon} from '../salon';
import {FormBuilder} from '@angular/forms';
import {SalonStore} from '../core/store/salon/salon.store';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit, OnDestroy {
  searchForm;
  allSalons: Salon[];
  displayedSalons: Salon[];
  errorLoadingSalons = false;
  selectedSalonId: number;

  private alive = true;

  constructor(private fb: FormBuilder, private salonService: SalonService, private salonStore: SalonStore) {
    this.salonStore.getSalons$().pipe(takeWhile(() => this.alive)).subscribe(salons => {
      this.allSalons = salons;
      this.displayedSalons = salons;
    });
    this.salonStore.getSalonLoadingError$().pipe(takeWhile(() => this.alive)).subscribe(isLoadingError => {
      this.errorLoadingSalons = isLoadingError;
    });
    this.searchForm = fb.group({
      'salonName': [],
      'gender': []
    });
  }

  ngOnInit() {
    this.salonStore.loadSalons$();
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
  }

  private applyFilter(salonName, gender) {
    this.displayedSalons = this.allSalons.filter(salon => {
      const salonNameMatch = !salonName || salon.name.includes(salonName);
      const genderMatch = !gender || salon.genderServed === gender || salon.genderServed === 'both';
      return salonNameMatch && genderMatch;
    });
  }
}
