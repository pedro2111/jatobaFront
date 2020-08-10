import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {

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

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private notifierService: NotifierService,
    private categoriaService:CategoriaService
  ) { }



  ngOnInit() {
    this.listarCategorias();
  }

  public cadastrar() {
    let produto = this.formulario.getRawValue();

    this.produtoService.cadastrar(produto).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Produto Cadastrado com sucesso!!');
        setTimeout(() => {
          this.router.navigate([`/administracao/produto/novo/${res.id}/capa`]);
        }, 2000);


      }, (err) => {
        console.log(err)
      }
    );

  }
  public listarCategorias(){
    this.categoriaService.listar().subscribe(
      (res) => {
        this.categorias = res;
      },(err) => {
        console.log(err)
      });
  }


}
