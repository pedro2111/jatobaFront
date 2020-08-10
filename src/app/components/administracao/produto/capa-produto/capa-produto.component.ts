import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-capa-produto',
  templateUrl: './capa-produto.component.html',
  styleUrls: ['./capa-produto.component.css']
})
export class CapaProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  imagem: File;
  imagemMin;
  produto_id;
  tipo = 'CAPA'

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.produto_id = param.get('id')
      console.log(this.produto_id)
    });

  }

  upload(){
// [routerLink]="['/administracao/produto/novo/1/imagem']"
  }
  preview(event){

  }
  reset(){

  }

}
