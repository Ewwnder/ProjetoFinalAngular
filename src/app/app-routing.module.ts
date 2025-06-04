import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { GerenciarComponent } from './components/gerenciar/gerenciar.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'cadastro', component:CadastroComponent},
  {path:'gerenciar', component:GerenciarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
