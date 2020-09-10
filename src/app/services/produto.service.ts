import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../shared/produto';
import { URL_API } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http:HttpClient) { }

  public cadastrar(produto:Produto){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.post<Produto>(`${URL_API}/produtos`,produto,httpOptions);

  }

  public listarCategorias(){
    return this.http.get<Produto>(`${URL_API}/categorias`);
  }

  public listarProdutosImagens(){

    return this.http.get(`${URL_API}/produtos/listarImagens`);

  }

  public listarProdutos(){

    return this.http.get<Produto>(`${URL_API}/produtos`);
  }

  public listarProdutosById(id){

    return this.http.get<Produto>(`${URL_API}/produtos/${id}`);
  }

  public atualizarProduto(id,produto){

    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-type', 'application/json');

    const httpOptions = {
      headers: headers
    }

    return this.http.put(`${URL_API}/produtos/${id}`,produto,httpOptions);

  }

  public deletarProdutoComImagens(id){

    return this.http.delete(`${URL_API}/produtos/${id}`);

  }
}
