import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolverGuard implements Resolve<Produto> {

  constructor(private produtoService: ProdutoService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto>{
    
      return this.produtoService.listarProdutos();

  }

  
 
  
}
