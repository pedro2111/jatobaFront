import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/shared/produto';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators'
import { ImagemService } from 'src/app/services/imagem.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-home-produto',
  templateUrl: './home-produto.component.html',
  styleUrls: ['./home-produto.component.css']
})
export class HomeProdutoComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService,
    private imagemService: ImagemService,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) { }

  produtosCapas;
  produtos: Produto;
  p;
  page = 0;
  size = 10;
  totalElementos;
  categoria = [4]

  ngOnInit() {
    //this.listarProdutosCapas();
    this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria)

  }

  public listarProdutosImagens() {
    this.produtoService.listarProdutosImagens().subscribe(
      (res) => {
        
        this.produtosCapas = res
        //console.log(res[0][0]['nome'])
        //console.log(res[0][1]['url'])
      }, (err) => {
        console.log(err)
      })
  }

  public listarProdutosCapas() {

    this.imagemService.listarCapas().subscribe(
      (res) => {

        this.produtosCapas = res
      }, (err) => {
        console.log(err)
      })
  }

  public listarProdutosCapasPaginadas(page, size, categoria) {

    this.imagemService.listarCapasPaginadas(page, size,categoria).subscribe(
      (res) => {
        this.totalElementos = res['totalElements'],
          this.produtosCapas = res['content']
          

      }, (err) => {
        console.log(err)
      })

  }

  public pageChange(event) {

    console.log(event)

  }
  public getPage(page) {
    this.page = page - 1;
    this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria);

  }
  public deletarProdutoComImagens(id) {

    this.produtoService.deletarProdutoComImagens(id).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Produto Deletado com sucesso!');
        this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria);
      }, (err) => {
        console.log(err)
      })

  }

  public trocarStatus(id) {

    this.produtoService.TrocarStatus(id).subscribe(
      (res: Produto) => {

        this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria)

      })
  }

}
