import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Products } from 'src/app/models/products.model';
import { BuyDialogComponent } from 'src/app/service/dialog/buy-dialog/buy-dialog.component';
import { ProductsService } from 'src/app/service/products/products.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-products-profile',
  templateUrl: './products-profile.component.html',
  styleUrls: ['./products-profile.component.scss']
})
export class ProductsProfileComponent implements OnInit {
  product: any;
  prodSub: any;
  productID: any;
  quantity: number = 1;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cart: CartService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.productID = params['id'];
    })
    this.prodSub = this.productService.getProduct(this.productID).subscribe((prod) => {
      this.product = prod;
    });
  }

  buy(prod: Products){
    const cartItem = new Cart(prod);
    this.cart.addCart(cartItem, this.quantity);
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      height: '300px',
      width: '500px',
    });
  }

  plusButton(){
    this.quantity++;
  }

  minusButton(){
    if(this.quantity > 1)
    {
      this.quantity--;
    }
  }

}
