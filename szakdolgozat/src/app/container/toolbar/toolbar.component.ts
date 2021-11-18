import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/shopping-cart/cart.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  cartsList: any;

  constructor(
    private carts: CartService,
  ) { }

  ngOnInit(): void {
    this.cartsList = this.carts.productsItem;
  }

  toggleBadgeVisibility() {
    this.cartsList = this.carts.productsItem;
  }

}
