import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemService } from 'src/app/services/imagem.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-capa-produto',
  templateUrl: './capa-produto.component.html',
  styleUrls: ['./capa-produto.component.css']
})
export class CapaProdutoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private imagemService:ImagemService,
    private notifierService: NotifierService,
    private router: Router)
     { }

  @ViewChild('imagemInput') imagemFile: ElementRef;

  imagem: File;
  imagemMin: File;
  produto_id;
  tipo = 'CAPA'

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.produto_id = param.get('id')
    });

  }

  upload(){
    this.imagemService.upload(this.imagem,this.produto_id, this.tipo).subscribe(
      (res) => {
        this.notifierService.notify('success', 'Capa Cadastrada com sucesso!!');
        setTimeout(() => {
          this.router.navigate([`/administracao/produto/novo/${this.produto_id}/imagem`]);
        }, 2000);

      });
  }
  preview(event){
    this.imagem = event.target.files[0];
    const fr = new FileReader();

    fr.onload = (evento: any) => {
      this.imagemMin = evento.target.result;
    }
    fr.readAsDataURL(this.imagem)

  }
  reset(){
    this.imagem = null;
    this.imagemMin = null;
    this.imagemFile.nativeElement.value = '';
  }

}
