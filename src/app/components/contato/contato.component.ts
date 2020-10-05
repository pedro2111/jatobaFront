import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
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

  constructor(
    private orcamentoService:OrcamentoService,
    private notifierService:NotifierService) { }


  ngOnInit(): void {
  }

  public cadastrar(){

    let orcamento:Orcamento = this.formulario.getRawValue();

    this.orcamentoService.cadastrar(orcamento).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Solicitação enviada com sucesso!');
        this.formulario.reset();
      }, (err) => {
        console.log(err)
      })

  }

}
