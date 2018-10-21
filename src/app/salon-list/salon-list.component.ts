import { Component, OnInit } from '@angular/core';
import { SalonService } from '../salon.service';
import { Salon } from '../salon';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {
  searchForm;
  allSalons: Salon[];
  displayedSalons: Salon[];
  errorLoadingSalons = false;
  selectedSalonId: number;

  constructor(private fb: FormBuilder, private salonService: SalonService) {
    this.searchForm = fb.group({
      'salonName': [],
      'gender': []
    });
  }

  ngOnInit() {
    this.salonService.loadSalons().subscribe(
      salons => {
        this.allSalons = salons;
        this.displayedSalons = salons;
      },
      error => {
        this.errorLoadingSalons = true;
        console.log(error);
      }
    );
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
