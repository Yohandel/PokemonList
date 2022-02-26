import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFavorites, IPokemon } from 'src/app/services/interfaces';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';

@Component({
  selector: 'app-favorites-pokemons',
  templateUrl: './favorites-pokemons.component.html',
  styleUrls: ['./favorites-pokemons.component.css']
})
export class FavoritesPokemonsComponent implements OnInit {

  favorites:IFavorites[] = []

  favoriteForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    alias: new FormControl(''),
    createdAt: new FormControl(new Date(),Validators.required),
  });

  constructor(private _pokemonService: PokemonsServiceService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(){
    this.favorites = this._pokemonService.getFavoritesList();
      
  }


  deleteFavorite(item){

    this.favoriteForm.patchValue(item);

    let response = this._pokemonService.deleteFromFavorites(this.favoriteForm.controls.name.value);

    if(response){
      console.log('Pokemon eliminado')
      this.getFavorites();

    }else{
      console.log('Pokemon no se pudo eliminar')
    }
  }

}
