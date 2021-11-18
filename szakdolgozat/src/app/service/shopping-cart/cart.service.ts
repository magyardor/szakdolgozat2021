import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Carts } from "src/app/models/cart";

@Injectable({providedIn: 'root'})
export class CartService {
  existsInCart: boolean = false;
  existingInCart: any;
  quantity: number = 1;
  productsItem: Carts[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(){}

  addCart(products: Carts) {
    if(this.productsItem.length > 0){
      this.existingInCart = this.productsItem.find(x => x.id === products.id);
      this.existsInCart = (this.existingInCart != undefined);
    }
    if(this.existsInCart) {
      this.existingInCart.quantity++;
    }
    else {
      this.productsItem.push(products);
    }

    this.totalPrices();
  }

  updateCart(list: any){
    this.productsItem = list;
    this.totalPrices();
    console.log(this.productsItem);
  }

  totalPrices() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for(let currentCartItem of this.productsItem){
      totalPriceValue += currentCartItem.quantity * currentCartItem.price;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  /* getCartItem(totalPriceValue: number, totalQuantityValue: number) {
    for(let cartItem of this.productsItem) {
      const subscibeTotalPrice = cartItem.quantity * cartItem.price
    }
  } */

  reductionQuantity(cartItem: any) {
    this.existingInCart.quantity--;

    if(this.quantity == 0){
      this.removeCart(cartItem);
    }
    else{
      this.totalPrices();
    }
  }

  plusQuantity(cartItem: any){
    this.existingInCart.quantity++;
    if(this.quantity == 0){
      this.removeCart(cartItem);
    }
    else{
      this.totalPrices();
    }
  }

  removeCart(cartItem: any){
    let index = this.productsItem.indexOf(cartItem);
    this.productsItem.splice(index,1);
    this.totalPrices();
  }
}
