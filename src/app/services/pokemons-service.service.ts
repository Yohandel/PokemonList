import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonsServiceService {
  url = environment.pokemonsUlr

  constructor(private _http: HttpClient) { }

  getPokemonList(){
   return this._http.get(`${this.url}/pokemon`)
  }


}
