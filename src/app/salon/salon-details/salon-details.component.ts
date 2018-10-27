import {Component, Input} from '@angular/core';
import {SalonDetails} from '../model/salon-details';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent {

  @Input() salonDetails: SalonDetails;

  constructor() { }

}
