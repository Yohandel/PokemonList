import { Component, OnInit } from '@angular/core';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent implements OnInit {
  pokemons:any[] = []

  constructor(private _pokemonService: PokemonsServiceService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this._pokemonService.getPokemonList().subscribe((data:any) =>{
      this.pokemons = data.results
    })
  }

}
