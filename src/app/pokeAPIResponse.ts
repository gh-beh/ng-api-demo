import { Pokemon } from "./pokemon";

export interface PokeAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
