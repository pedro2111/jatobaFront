import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/shared/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  constructor(
    private produtoService:ProdutoService,
    private imagemService:ImagemService,
    private categoriaService: CategoriaService,
    private route:ActivatedRoute) { }

  formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'descricao': new FormControl(null, [Validators.required]),
    'preco': new FormControl(null),
    'altura': new FormControl(null),
    'largura': new FormControl(null),
    'profundidade': new FormControl(null),
    'peso': new FormControl(null),
    'nomeCategoria': new FormControl(null, [Validators.required])
  });
  categorias;
  produtoId;
  produto: Produto;
  imagens;

  ngOnInit(): void {
    this.listarCategorias();
    this.route.paramMap.subscribe((param) => {
      this.produtoId = param.get('id')
    })
    this.listarProduto(this.produtoId);
    this.listarImagensByProduto(this.produtoId)

  }

  public atualizar() { }

  public listarCategorias(){
    this.categoriaService.listar().subscribe(
      (res) => {
        this.categorias = res
    }, (err) => {
      console.log(err)
    })
  }
  public listarProduto(id){

    this.produtoService.listarProdutosById(id).subscribe(
      (res) => {
        this.carregaForm(res), 
        this.produto = res
      },(err) => {
        console.log(err)
      })

  }
  public listarImagensByProduto(id){
    this.imagemService.listarImagensByProduto(id).subscribe(
      (res) => {
        this.imagens = res
      }, (err) => {
        console.log(err)
      })
  }

  public carregaForm(produto:Produto){
    this.formulario.patchValue({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      altura: produto.altura,
      largura: produto.largura,
      profundidade: produto.profundidade,
      peso: produto.peso,
      nomeCategoria: produto.nomeCategoria
    });
  }



}
