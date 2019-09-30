import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private product: Product = {};
  private productId: string = null;
  private productSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
  ) { 
    this.productId = this.activeRoute.snapshot.params['id'];
    if(this.productId) this.loadProduct();
  }

  loadProduct(){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data =>{
      this.product = data;
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }


  ngOnInit() {
  }

  saveProduct(){
    this.product.userId = this.authService.getAuth().currentUser.uid;
    if (this.productId) {
      try {
        this.productService.updateProduct(this.productId, this.product);
        this.navCtrl.navigateBack('/product');
      } catch (error) {
        console.log(error);
      }
    } else {
      this.product.createdAt = new Date().getTime();
      try {
        this.productService.addProduct(this.product);
        this.navCtrl.navigateBack('/product');
      } catch (error) {
        console.log(error);
      }
    }
  }

}
