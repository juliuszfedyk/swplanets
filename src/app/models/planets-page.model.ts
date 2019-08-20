import {Planet} from './planet.model';

export interface PlanetsPage {
  'count': number;
  'next': string;
  'previous': string;
  'results': Planet[];
}
