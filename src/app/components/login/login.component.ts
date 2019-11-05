import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public email: string
public password: string


  constructor(
    public authService: OauthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email, this.password)
    .then( (res) =>{
      this.router.navigate(['/private']);
    }).catch( (err) =>{
      
      this.router.navigate(['/login']);
      console.log(err);
    });
  }
  
}
