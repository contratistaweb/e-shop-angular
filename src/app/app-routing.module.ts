import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrivatepageComponent } from './components/privatepage/privatepage.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'private', component: PrivatepageComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
