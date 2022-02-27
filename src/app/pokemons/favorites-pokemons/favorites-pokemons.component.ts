import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFavorites, IPokemon } from 'src/app/services/interfaces';
import { PokemonsServiceService } from 'src/app/services/pokemons-service.service';
declare const $: any;

@Component({
  selector: 'app-favorites-pokemons',
  templateUrl: './favorites-pokemons.component.html',
  styleUrls: ['./favorites-pokemons.component.css']
})
export class FavoritesPokemonsComponent implements OnInit {

  favorites:IFavorites[] = []
  isInvalid:boolean = false

  favoriteForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    alias: new FormControl('', Validators.required),
    createdAt: new FormControl(new Date(),Validators.required),
  });

  constructor(private _pokemonService: PokemonsServiceService) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(){
    this.favorites = this._pokemonService.getFavoritesList();
  }

  getFavorite(pokemon){
    this.favoriteForm.patchValue(pokemon)
    console.log(this.favoriteForm.value)
  }

  editFavoriteAlias(){
    console.log(this.favoriteForm.value)
    
    if(!this.favoriteForm.valid){
      this.isInvalid = true
      return;
    }
    
    this.isInvalid = false
    let response = this._pokemonService.editFavorite(this.favoriteForm.get('name').value, this.favoriteForm.get('alias').value);
 
     if(response){
       this.getFavorites();
       this.resetForm()
       alert('Pokemon Editado')
 
     }else{
       console.log('Pokemon no se pudo editar')
     }
  }

  resetForm(){
    
    this.favoriteForm.reset()
  }

  deleteFavorite(item){

    this.favoriteForm.patchValue(item);

    if (confirm('Este pokemon se va a eliminar de tu lista de favoritos') == true) {      
      let response = this._pokemonService.deleteFromFavorites(this.favoriteForm.controls.name.value);
  
      if(response){
        this.getFavorites();
        alert('Pokemon eliminado')
  
      }else{
        console.log('Pokemon no se pudo eliminar')
      }
    }
    else{
      return
    }

  }

}
