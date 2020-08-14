import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemService } from 'src/app/services/imagem.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-imagem-produto',
  templateUrl: './imagem-produto.component.html',
  styleUrls: ['./imagem-produto.component.css']
})
export class ImagemProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private imagemService: ImagemService,
    private notifierService: NotifierService,
    private router: Router) { }

  @ViewChild('imagemInput') imagensFile: ElementRef;

  imagens: FileList;
  imagensMin = [];
  produto_id;
  tipo = 'COMPLEMENTO'

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.produto_id = param.get('id')
    });
  }

  upload() {
    for (let i = 0; i < this.imagens.length; i++) {
      this.imagemService.upload(this.imagens[i], this.produto_id, this.tipo).subscribe(
        (res) => {
          this.notifierService.notify('success', 'Imagem Cadastrada com sucesso!!');
        },(err) => {
          console.log(err)
        });

    }
    setTimeout(() => {
      this.router.navigate([`/administracao/produto/home`]);
    }, 2000);

  }
  preview(event) {
    this.imagensMin = []
    this.imagens = event.target.files;
    let qtdFiles = event.target.files.length;

    for (let i = 0; i < qtdFiles; i++) {
      const fr = new FileReader();

      fr.onload = (evento: any) => {
        this.imagensMin.push(evento.target.result)
      }
      fr.readAsDataURL(event.target.files[i])

    }



  }
  reset() {
    this.imagens = null;
    this.imagensMin = null;
    this.imagensFile.nativeElement.value = '';
  }

}
