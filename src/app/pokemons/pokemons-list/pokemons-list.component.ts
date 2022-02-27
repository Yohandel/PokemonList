import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFavorites, IPokemon } from 'src/app/services/interfaces';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';
declare const $: any;

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent implements OnInit {
  pokemons: IPokemon[] = []
  isInvalid:boolean = false

  favoriteForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    alias: new FormControl('', Validators.required),
    createdAt: new FormControl(new Date(), Validators.required),
  });

  constructor(private _pokemonService: PokemonsServiceService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._pokemonService.getPokemonList().subscribe((data: any) => {
      this.pokemons = data.results;

      this.getFavorites();

    })
  }


  getFavorites() {
    let values = this._pokemonService.getFavoritesList();

    this.pokemons.forEach((element) => {
      element.isFavorite = false;
      values.forEach((session) => {
        if (element.name == session.name) {
          element.isFavorite = true;
        }
      })
    })
  }

 

  deleteFavorite(item) {

    this.favoriteForm.patchValue(item);

    if (confirm('Vas a liberar este pokemon') == true) {
      let response = this._pokemonService.deleteFromFavorites(this.favoriteForm.controls.name.value);

      if (response) {
        this.getFavorites();
        alert('Pokemon eliminado')


      } else {
        console.log('Pokemon no se pudo eliminar')
      }
    }

  }

  setFavorite(item) {
    this.favoriteForm.patchValue(item);
    console.log(item)
  }


  saveFavorite() {
    console.log(this.favoriteForm.value)

    if (!this.favoriteForm.valid) {
      this.isInvalid = true
      return;
    }

    this.isInvalid = false
    let response = this._pokemonService.addToFavorites(this.favoriteForm.value);
 
     if(response){
      //  $('#addFavoritePokemon').modal('hide');
       this.getFavorites();
       alert('Pokemon Agregado')
 
     }else{
       console.log('Pokemon no se pudo agregar')
     }
  }

  resetForm(){
    this.isInvalid = false
    this.favoriteForm.reset()
  }


}
