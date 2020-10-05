import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { Orcamento } from 'src/app/shared/orcamento';
import { ImagemService } from 'src/app/services/imagem.service';
import { Imagem } from 'src/app/shared/imagem';

@Component({
  selector: 'app-home-orcamento',
  templateUrl: './home-orcamento.component.html',
  styleUrls: ['./home-orcamento.component.css']
})
export class HomeOrcamentoComponent implements OnInit {

  orcamentos?;
  imagem;
  p;

  constructor(
    private orcamentoService: OrcamentoService,
    private imagemService: ImagemService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  public listar() {

    this.orcamentoService.listar().subscribe(
      (res:Orcamento) => {
        this.orcamentos = res,
        console.log(res)
      }, (err) => {
        console.log(err)
      })
  }

  public listarImagensProduto(orcamento: Orcamento) {

   
    if (orcamento[0].produto[0]) {

      this.imagemService.listarImagensByProduto(orcamento[0].produto[0].id).subscribe(
        (res) => {
          if(res['imagens'])
          this.imagem = res, console.log(res)
        }, (err) => {
          console.log(err)
        }
      )

    } else {
      return null;
    }

  }

}
