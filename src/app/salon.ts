import {Person} from './person';
import {Address} from './address';

export class Salon {
  id: number;
  name: string;
  genderServed: string;
  owner?: Person;
  belongsToChain: boolean;
  address: Address;
  shiny?: boolean;
}
