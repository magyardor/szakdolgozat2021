import { Component, OnInit } from '@angular/core';
import { Carts } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartsList: Carts[] = [];
  constructor(
    private carts: CartService
  ) { }

  async ngOnInit() {
    this.cartsList = await this.carts.getItems();
  }


}
