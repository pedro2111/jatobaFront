import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/administracao/dashboard/dashboard.component';
import { HomeProdutoComponent } from './components/administracao/produto/home-produto/home-produto.component';
import { NovoProdutoComponent } from './components/administracao/produto/novo-produto/novo-produto.component';
import { CapaProdutoComponent } from './components/administracao/produto/capa-produto/capa-produto.component';
import { ImagemProdutoComponent } from './components/administracao/produto/imagem-produto/imagem-produto.component';
import { ProdutoResolverGuard } from './components/administracao/produto/guards/produto-resolver.guard';
import { EditarProdutoComponent } from './components/administracao/produto/editar-produto/editar-produto.component';
import { HomeOrcamentoComponent } from './components/administracao/orcamento/home-orcamento/home-orcamento.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'administracao', component: DashboardComponent,
    children: [
      {path: '',component: HomeProdutoComponent},
      {path: 'produto/home', component: HomeProdutoComponent},
      {path: 'produto/novo', component: NovoProdutoComponent},
      {path: 'produto/novo/:id/capa', component: CapaProdutoComponent},
      {path: 'produto/novo/:id/imagem', component: ImagemProdutoComponent},
      {path: 'produto/:id/editar', component: EditarProdutoComponent},
      {path: 'orcamento/home', component: HomeOrcamentoComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProdutoResolverGuard]
})
export class AppRoutingModule { }
