import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public cadastrar(orcamento:Orcamento){
    
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers:headers
    }

    return this.http.post(`${URL_API}/orcamentos`, orcamento, httpOptions)

  }
}
