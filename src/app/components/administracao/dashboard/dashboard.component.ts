import { Component, OnInit } from '@angular/core';
//fadeOutRight
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  selected;
  constructor() { }
  

  ngOnInit() {
  }

  changeActive(selected:string){

    if(selected == 'homeProduto'){
      this.selected = 'homeProduto'
    }
    if(selected == 'novoProduto'){
      this.selected = 'novoProduto'
    }
    if(selected == 'homeOrcamento'){
      this.selected = 'homeOrcamento'
    }
    if(selected == 'outrosOrcamento'){
      this.selected = 'outrosOrcamento'
    }
    if(selected == 'homeCategoria'){
      this.selected = 'homeCategoria'
    }
    if(selected == 'novaCategoria'){
      this.selected = 'novaCategoria'
    }
    if(selected == 'homeUsuario'){
      this.selected = 'homeUsuario'
    }
    if(selected == 'novoUsuario'){
      this.selected = 'novoUsuario'
    }


  }

}
