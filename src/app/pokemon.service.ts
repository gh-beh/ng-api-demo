import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {PokeAPIResponse} from "./pokeAPIResponse";
import {PokeInfo} from "./pokeInfo";
import {AbilityInfo} from "./abilityInfo";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    }
  }

  getPokemons(): Observable<PokeAPIResponse> {
    return this.http.get<PokeAPIResponse>(this.pokemonsUrl)
      .pipe(
        catchError(this.handleError<PokeAPIResponse>('getPokemons', {count: 0, next: "", previous: "", results: []}))
      );
  }

  getPokemon(url: string): Observable<PokeInfo> {
    return this.http.get<PokeInfo>(url).pipe(
      catchError(this.handleError<PokeInfo>(`getPokemon url = ${url}`))
    )
  }

  getAbility(url: string): Observable<AbilityInfo> {
    return this.http.get<AbilityInfo>(url).pipe(
      catchError(this.handleError<AbilityInfo>(`getAbility url = ${url}`))
    )
  }
}
