import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { URL_SITE } from 'src/app/shared/app.api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImagemService } from 'src/app/services/imagem.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-home-produto-shop',
  templateUrl: './home-produto-shop.component.html',
  styleUrls: ['./home-produto-shop.component.css']
})
export class HomeProdutoShopComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private imagemService: ImagemService,
    private renderer: Renderer2,
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  baseUrl = URL_SITE;
  produtoModalRef: BsModalRef;
  totalElementos;
  produtosCapas;
  page = 0;
  size = 9;
  p;
  imagens?;
  toogleActive = false;
  categoria = [1, 2, 3, 4]

  formulario = new FormGroup({
    'categoria': new FormControl([null])
  });
  //@ViewChild("spanLike") spanLike: ElementRef;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      if (param['categoria'] != undefined) {
        this.listarProdutosCapasPaginadas(this.page, this.size, [param['categoria']]);
      } else {
        this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria)
      }
    }
    );

    //this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria);
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

  public listarProdutosCapasPaginadas(page, size, categoria: number[]) {

    this.imagemService.listarCapasPaginadas(page, size, categoria).subscribe(
      (res) => {
        this.totalElementos = res['totalElements'],
          this.produtosCapas = res['content']


      }, (err) => {
        console.log(err)
      })

  }

  public pageChange(event) {

    //console.log(event)

  }
  public getPage(page) {
    this.page = page - 1;
    this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria);

  }
  public favoritar(event, id) {

    this.renderer.addClass(event.target, 'added')
    this.like(id)
  }
  public favoritarSpan(event, id) {
    this.renderer.addClass(event.target.parentElement, 'added')
    this.like(id)
  }
  public favoritarHeart(event, id) {

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
  public activeFilter() {
    this.toogleActive = !this.toogleActive
  }

  public filtrar() {

    if (this.formulario.get("categoria").value == 0) {
      this.categoria = [1, 2, 3, 4]
    } else {
      this.categoria = [this.formulario.get("categoria").value];
    }

    this.listarProdutosCapasPaginadas(this.page, this.size, this.categoria);
  }

  public filtrarMobile (categoria){

    if(categoria == 0){
      categoria = [1,2,3,4]
    }
    this.listarProdutosCapasPaginadas(this.page, this.size, [categoria]);

  }

}
