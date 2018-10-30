import {Component, OnInit} from '@angular/core';
import {SalonService} from '../salon.service';
import {Salon} from '../salon';
import {FilterCriteria} from '../filter-criteria';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {
  allSalons: Salon[];
  displayedSalons: Salon[];
  errorLoadingSalons = false;
  selectedSalonId: number;

  constructor(private salonService: SalonService) {
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

  showSalonDetails(salonId: number) {
    this.selectedSalonId = salonId;
  }

  onUpdatedFilterCriteria(filterCriteria: FilterCriteria) {
    this.selectedSalonId = undefined;

    this.displayedSalons = this.allSalons.filter(salon => {
      const salonNameMatch = !filterCriteria.salonName || salon.name.includes(filterCriteria.salonName);
      const genderMatch = !filterCriteria.gender || salon.genderServed === filterCriteria.gender || salon.genderServed === 'both';
      return salonNameMatch && genderMatch;
    });
  }
}
