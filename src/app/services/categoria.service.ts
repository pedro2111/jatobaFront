import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../shared/categoria';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  public listar(){
    return this.http.get<Categoria>(`${URL_API}/categorias`);
  }
}
