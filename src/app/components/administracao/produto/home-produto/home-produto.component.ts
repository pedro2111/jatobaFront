import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/shared/produto';
import * as moment from 'moment';

@Component({
  selector: 'app-home-produto',
  templateUrl: './home-produto.component.html',
  styleUrls: ['./home-produto.component.css']
})
export class HomeProdutoComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService
  ) { }

  produtosImagens;
  produtos:Produto;
  
  ngOnInit() {
    this.listarProdutos();

  }

  public listarProdutosImagens() {
    this.produtoService.listarProdutosImagens().subscribe(
      (res) => {
        console.log(res)
        this.produtosImagens = res
        //console.log(res[0][0]['nome'])
        //console.log(res[0][1]['url'])
      }, (err) => {
        console.log(err)
      })
  }

  public listarProdutos(){

    this.produtoService.listarProdutos().subscribe(
      (res) => {
        console.log(res)
        this.produtos = res;
      },(err) => {
        console.log(err)
      })
  }

}
