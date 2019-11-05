import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../services/oauth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public isLogin: boolean
  public nombreUsuario: string
  public emailUsuario: string

  constructor(
    public authService: OauthService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if(auth){
        this.isLogin = true;
        this.nombreUsuario= auth.displayName;
        this.emailUsuario= auth.email;
      }else{
        this .isLogin= false;
      }
    })
  }

  onclickLogout(){
    this.authService.logout()
  }
}
