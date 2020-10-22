import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public deletar(id){

    return this.http.delete(`${URL_API}/imagens/${id}`);

  }

  public listarCapas(){

    return this.http.get(`${URL_API}/imagens`);

  }

  public listarCapasPaginadas(page,size,categoria:number[]){

    let catParams = new HttpParams();

    catParams = catParams.append('categoria', categoria.join(', '))

    

    return this.http.get(`${URL_API}/imagens/paginada?page=${page}&size=${size}&sort=id,desc`, {params:catParams})

  }

  public listarImagensByProduto(id){

    return this.http.get(`${URL_API}/imagens/${id}`);
  }

  public listarCapaByProduto(id){

    return this.http.get(`${URL_API}/imagens/produtoCapa/${id}`);
  }

  public listarMainProdutosMaisCurtidos(page,size) {

    return this.http.get(`${URL_API}/imagens/mainProdutosMaisCurtidos`);
  }
  public listarUltimosProdutos(page,size) {

    return this.http.get(`${URL_API}/imagens/mainUltimosProdutos`);
  }
}
