import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http:HttpClient) { }

  public upload(imagem:File, produto_id, tipo){

    const formData = new FormData();
    formData.append('multipartfile', imagem);
    formData.append('produto_id', produto_id);
    formData.append('tipo', tipo);
    
    return this.http.post(`${URL_API}/imagens/upload`, formData)
    
  }
}
