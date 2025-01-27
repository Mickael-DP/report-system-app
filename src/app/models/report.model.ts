import { Author } from './author.model';
import { Observation } from './observation.model';

export interface Report {
  id?: number;
  author: Author;
  observations: Observation[];
  description: string;
}
