import {Person} from './person';
import {Salon} from './salon';

export class SalonDetails extends Salon {
  owner?: Person;
  belongsToChain: boolean;
}
