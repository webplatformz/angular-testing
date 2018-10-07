import {Component, OnInit} from '@angular/core';
import {SalonService} from '../salon.service';
import {Salon} from '../salon';
import {FormBuilder} from '@angular/forms';

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

  constructor(private fb: FormBuilder, private salonService: SalonService) {
    this.searchForm = fb.group({
      'salonName': [],
      'gender': []
    })
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
    )
  }

  onSearch() {
    let salonName = this.searchForm.controls.salonName.value;
    let gender = this.searchForm.controls.gender.value;
    this.applyFilter(salonName, gender);
  }

  private applyFilter(salonName, gender) {
    this.displayedSalons = this.allSalons.filter(salon => {
      let salonNameMatch = !salonName || salon.name.includes(salonName);
      let genderMatch = !gender || salon.genderServed === gender || salon.genderServed === 'both';
      return salonNameMatch && genderMatch;
    });
  }
}
