import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  private products = new Array<Product>();
  private productsSubcription: Subscription;

  constructor(private productService: ProductService) {
    this.productsSubcription = this.productService.getProducts().subscribe(data =>{
      this.products = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.productsSubcription.unsubscribe();
  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  }
}
