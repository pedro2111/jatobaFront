import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { URL_SITE } from 'src/app/shared/app.api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImagemService } from 'src/app/services/imagem.service';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-home-produto-shop',
  templateUrl: './home-produto-shop.component.html',
  styleUrls: ['./home-produto-shop.component.css']
})
export class HomeProdutoShopComponent implements OnInit {

   constructor(
    private modalService:BsModalService,
    private imagemService:ImagemService,
    private renderer:Renderer2,
    private produtoService:ProdutoService
  ) { }

  baseUrl = URL_SITE;
  produtoModalRef:BsModalRef;
  totalElementos;
  produtosCapas;
  page = 0;
  size = 10;
  p;
  imagens?;
  //@ViewChild("spanLike") spanLike: ElementRef;

  ngOnInit(): void {
    this.listarProdutosCapasPaginadas(this.page,this.size);
  }

  public openModalProduto(template: TemplateRef<any>, produtoId){

    this.imagemService.listarImagensByProduto(produtoId).subscribe(
      (res) => {
        this.imagens = res
      },(err) => {
        console.log(err)
      })

    this.produtoModalRef = this.modalService.show(template)
  }

  public listarProdutosCapasPaginadas(page, size) {

    this.imagemService.listarCapasPaginadas(page, size).subscribe(
      (res) => {
        this.totalElementos = res['totalElements'],
          this.produtosCapas = res['content'],
          console.log(res)

      }, (err) => {
        console.log(err)
      })

  }

  public pageChange(event) {

    console.log(event)

  }
  public getPage(page) {
    this.page = page - 1;
    this.listarProdutosCapasPaginadas(this.page, this.size);

  }
  public favoritar(event){
    
    this.renderer.addClass(event.target,'added')
  }
  public favoritarSpan(event){
    this.renderer.addClass(event.target.parentElement,'added')
  }
  public favoritarHeart(event){
    
    this.favoritar(event.target)
  }

}
