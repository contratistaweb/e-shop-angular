import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcarService } from 'src/app/services/shoppingcar.service';
import { Product } from 'src/app/models/product';




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  filterProducts = '';
  productList: Product[];
  unidades:string;
  constructor(
    private productService: ProductService,
    private shoppingcarService: ShoppingcarService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      }) 
    });
    
  }
  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({},product) ;
  }
  onDelete($key:string){
    this.productService.deleteProduct($key);
  }

  shoppingCarAdd(product: any, unidades: any){
    let cant = unidades.value;
    let newUnds = product.unds - cant;
    let subtotal = product.price * cant
    product = {
      $key: product.$key,
      name: product.name,
      location: product.location,
      price: product.price,
      unds: newUnds
    };

    let productSC:Product = {
      $key: product.$key,
      name: product.name,
      location: product.location,
      price: subtotal,
      unds: cant
    };
    if(product.unds >= cant){
    this.productService.updateProduct(product);
    this.shoppingcarService.insertProductSC(productSC);
    
  }else{
    alert("la cantidad de producto "+product.name+" que quieres comprar no esta disponible, solo tenemos disponibles para mas informacion puedes dar click en el boton 'ver +' del producto.")
  }
  }



  
}
