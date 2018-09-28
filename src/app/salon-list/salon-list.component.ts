import {Component, OnInit} from '@angular/core';
import {SalonService} from '../salon.service';
import {Salon} from '../salon';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {
  salons: Salon[];
  errorLoadingSalons = false;

  constructor(private salonService: SalonService) {
  }

  ngOnInit() {
    this.salonService.loadSalons().subscribe(
      salons => {
        this.salons = salons;
      },
      error => {
        this.errorLoadingSalons = true
      }
    )
  }
}
