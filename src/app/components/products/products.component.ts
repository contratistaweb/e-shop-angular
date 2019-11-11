import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../services/oauth.service';
import { ShoppingcarService } from 'src/app/services/shoppingcar.service';
import { Product } from 'src/app/models/product';
import { FormsModule } from '@angular/forms';
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
  shoppingCar: Product[];
  total:number;
  not:number = 0;

  constructor(
    public authService: OauthService,
    private shoppingcarService: ShoppingcarService,
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
    });
    this.shoppingcarService.getProductsSC()
    .snapshotChanges()
    .subscribe(item => {
      this.shoppingCar = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.shoppingCar.push(x as Product);
      }) 
    });
    
  }

  onClickLogout(){
    this.authService.logout()
  }

  getShoppingCar(){
    this.shoppingcarService.getProductsSC();
    this.total = this.shoppingCar.reduce((
      acc,
      obj,
    ) => acc + obj.price,
    0);
  }
  shoppingCarClean(){
    let del = this.shoppingCar.length;
    this.shoppingcarService.shoppingCar.remove();
    this.total = 0;
    this.not = 0;
  }

}

