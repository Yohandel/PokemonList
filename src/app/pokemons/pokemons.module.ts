import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonsListComponent } from './pokemons-list/pokemons-list.component';
import { FavoritesPokemonsComponent } from './favorites-pokemons/favorites-pokemons.component';


@NgModule({
  declarations: [
    PokemonsListComponent,
    FavoritesPokemonsComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule
  ]
})
export class PokemonsModule { }