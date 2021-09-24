import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from "../pokemon.service";
import { PokeInfo } from "../pokeInfo";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon?: Pokemon;
  selectedPokemonInfo?: PokeInfo;
  constructor(private pokemonService: PokemonService) { }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons.results);
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.pokemonService.getPokemon(pokemon.url).subscribe(pokeInfo => this.selectedPokemonInfo = pokeInfo);
  }
}
