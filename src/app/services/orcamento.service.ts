import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../shared/app.api';
import { Orcamento } from '../shared/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Orcamento>(`${URL_API}/orcamentos`);
  }
}
