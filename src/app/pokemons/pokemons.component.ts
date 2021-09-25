import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../pokemon';
import { PokemonService } from "../pokemon.service";
import { PokeInfo } from "../pokeInfo";
import { AbilityInfo } from "../abilityInfo";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonInfo: PokeInfo[] = [];
  abilities: AbilityInfo[] = [];
  constructor(private pokemonService: PokemonService) { }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons.results);
  }

  getPokemon(url: string, index: number): void {
    this.pokemonService.getPokemon(url)
      .subscribe(pokeInfo => this.pokemonInfo[index] = pokeInfo);
  }

  getAbility(url: string, index: number): void {
    this.pokemonService.getAbility(url)
      .subscribe(abilityInfo => {
        abilityInfo.en_desc = abilityInfo.effect_entries.reduce((ret, x) => {
          if (ret.language.name === "en") return ret;
          return x;
        }).short_effect;
        this.abilities[index] = abilityInfo;
      });
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
