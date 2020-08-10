import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/administracao/dashboard/dashboard.component';
import { HomeProdutoComponent } from './components/administracao/produto/home-produto/home-produto.component';
import { NovoProdutoComponent } from './components/administracao/produto/novo-produto/novo-produto.component';
import { CapaProdutoComponent } from './components/administracao/produto/capa-produto/capa-produto.component';
import { ImagemProdutoComponent } from './components/administracao/produto/imagem-produto/imagem-produto.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'administracao', component: DashboardComponent,
    children: [
      {path: '', component: HomeProdutoComponent,data: {animation: 'isRight'}},
      {path: 'produto/home', component: HomeProdutoComponent,data: {animation: 'isRight'}},
      {path: 'produto/novo', component: NovoProdutoComponent,data: {animation: 'isRight'}},
      {path: 'produto/novo/:id/capa', component: CapaProdutoComponent,data: {animation: 'isRight'}},
      {path: 'produto/novo/:id/imagem', component: ImagemProdutoComponent,data: {animation: 'isRight'}}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
