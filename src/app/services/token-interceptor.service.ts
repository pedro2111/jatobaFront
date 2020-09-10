import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector, 
    private router:Router,
    private notifierService:NotifierService) { }

  intercept(req,next){
    let token = localStorage.getItem('token')
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(tokenizedReq)
    .pipe(
      catchError((error: HttpErrorResponse) => {

        this.notifierService.notify('error', 'Login expirou! Realize um novo login!')
        this.router.navigate(['/'])
        return throwError(error);
        
      })
    );

  }
}