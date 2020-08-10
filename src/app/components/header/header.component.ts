import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/shared/usuario.model';
import * as jwt_decode from 'jwt-decode'
import { NotifierService } from 'angular-notifier';
import { URL_SITE } from 'src/app/shared/app.api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private notifierService: NotifierService) {
    
   }

  error: boolean = false;
  showAdm: boolean = false;
  formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  });
  baseUrl = URL_SITE;
 

  ngOnInit() {

    this.setShowAdm();
    //window.location.reload();
    
  }

  setShowAdm(){
    let token = localStorage.getItem('token');
    if (token != null){
      this.showAdm = true;
    }else{
      this.showAdm = false;
    }
  }
  login() {
    localStorage.clear();
    let usuario: Usuario;
    usuario = this.formulario.getRawValue();
    

    this.loginService.login(usuario).subscribe((res) => {

      let token_decode = jwt_decode(res['token']);
      localStorage.setItem('nomeUsuario', token_decode['usuario']);
      localStorage.setItem('token', res['token']);
      localStorage.setItem('usuario', usuario.email);
      this.error = false;
      this.showAdm = true;
      this.notifierService.notify('success', 'Olá! Seja bem vinda(o) ' + token_decode['usuario'])
      //this.router.navigate(['/administracao']).then(() => {window.location.reload();})
    }, (err) => {
      console.log(err);
      this.error = true;
    });
  }

}
