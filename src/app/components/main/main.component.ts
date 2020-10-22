import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { URL_SITE } from 'src/app/shared/app.api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImagemService } from 'src/app/services/imagem.service';
import { ProdutoService } from 'src/app/services/produto.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private imagemService: ImagemService,
    private renderer: Renderer2,
    private produtoService: ProdutoService
  ) { }

  baseUrl = URL_SITE;
  produtoModalRef: BsModalRef;
  totalElementos;
  produtosMaisCurtidos;
  produtosUltimosProdutos;
  page = 0;
  size = 3;
  p;
  imagens?;

  ngOnInit() {
    this.listarMainProdutos(this.page, this.size);
    
  }

  public openModalProduto(template: TemplateRef<any>, produtoId) {

    this.imagemService.listarImagensByProduto(produtoId).subscribe(
      (res) => {
        this.imagens = res
      }, (err) => {
        console.log(err)
      })

    this.produtoModalRef = this.modalService.show(template)
    
  }

  public listarMainProdutos(page, size) {

    this.imagemService.listarMainProdutosMaisCurtidos(page, size).subscribe(
      (res) => {
        this.totalElementos = res['totalElements'],
          this.produtosMaisCurtidos = res['content']
      }, (err) => {
        console.log(err)
      })

    this.imagemService.listarUltimosProdutos(page, size).subscribe(
      (res) => {
        this.totalElementos = res['totalElements'],
          this.produtosUltimosProdutos = res['content']
      }, (err) => {
        console.log(err)
      })

  }

  public pageChange(event) {

    //console.log(event)

  }
  public getPage(page) {
    this.page = page - 1;
    this.listarMainProdutos(this.page, this.size);

  }
  public favoritar(event,id) {

    this.renderer.addClass(event.target, 'added')
    this.like(id)
  }
  public favoritarSpan(event,id) {
    this.renderer.addClass(event.target.parentElement, 'added')
    this.like(id)
  }
  public favoritarHeart(event,id) {

    this.renderer.addClass(event.target.parentElement.parentElement, 'added')
    this.like(id)
  }

  public like(id) {
    this.produtoService.like(id).subscribe(
      (res) => { },
      (err) => {
        console.log(err)
      })
  }

}
