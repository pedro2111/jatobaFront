import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ImagemService } from 'src/app/services/imagem.service';
import { OrcamentoService } from 'src/app/services/orcamento.service';
import { Orcamento } from 'src/app/shared/orcamento';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
    id:new FormControl(null),
    nome:new FormControl(null, [Validators.required]),
    email:new FormControl(null, [Validators.required]),
    telefone:new FormControl(null, [Validators.required]),
    assunto:new FormControl(null),
    mensagem:new FormControl(null, [Validators.required]),
    produtos:new FormControl(null)    
  }) 

  produto_id?;
  produto?;

  constructor(
    private orcamentoService:OrcamentoService,
    private notifierService:NotifierService,
    private route:ActivatedRoute,
    private imagemService:ImagemService) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      this.produto_id = param.get('id');
    })

    if(this.produto_id != null){
      this.listarProduto(this.produto_id)
    }
      
  }

  public cadastrar(){

    let orcamento:Orcamento = this.formulario.getRawValue();
    if(this.produto_id != null){
      orcamento.produto_ids = [parseInt(this.produto_id)]
    }
    //console.log(orcamento)

    this.orcamentoService.cadastrar(orcamento).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Solicitação enviada com sucesso!');
        this.formulario.reset();
      }, (err) => {
        console.log(err)
      })

  }

  public listarProduto(id){
    this.imagemService.listarCapaByProduto(id).subscribe(
      (res) => {
        this.produto = res
      }, (err) => {
        console.log(err)
      })
  }

}
