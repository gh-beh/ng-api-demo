import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from './pokemon';
import { PokeAPIResponse} from "./pokeAPIResponse";
import {PokeInfo} from "./pokeInfo";

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
      return of(result as T);
    }
  }

  getPokemons(): Observable<PokeAPIResponse> {
    let res: Observable<PokeAPIResponse> =  this.http.get<PokeAPIResponse>(this.pokemonsUrl)
      .pipe(
        catchError(this.handleError<PokeAPIResponse>('getPokemons', {count: 0, next: "", previous: "", results: []}))
      );
    return res;
  }

  getPokemon(url: string): Observable<PokeInfo> {
    return this.http.get<PokeInfo>(url).pipe(
      catchError(this.handleError<PokeInfo>(`getPokemon url = ${url}`))
    )
  }
}
