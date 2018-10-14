import {Component, Input} from '@angular/core';
import {Salon} from '../salon';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent {

  @Input() salon: Salon;

  constructor() { }

}
