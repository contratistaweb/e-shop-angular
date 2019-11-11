import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcarService {
  
  shoppingCar: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProductsSC(){
    return this.shoppingCar = this.firebase.list('shoppingcar');
  }
  insertProductSC(product:Product){
    this.shoppingCar.push({
      name : product.name,
      location : product.location,
      unds : product.unds,
      price : product.price
    });
  }
  
  updateProductSC(product: Product){
    this.shoppingCar.update(product.$key, {
      name : product.name,
      location : product.location,
      price : product.price,
      unds : product.unds
    })
  }
  
  deleteProductSC($key: string){
    this.shoppingCar.remove($key)
  }
  
}
