import { Injectable } from "@angular/core";
import { Carts } from "src/app/models/cart.model";

@Injectable({providedIn: 'root'})
export class CartService {
  productsItem: Carts[] = [];

  constructor(){}

  addCart(products: Carts) {
    this.productsItem.push(products);
    console.log(products);
  }

  getItems() {
    return this.productsItem;
  }

  clearCart() {
    this.productsItem = [];
    return this.productsItem;
  }
}
