import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cart } from "src/app/models/cart";
import { Data, Orders } from "src/app/models/orders.model";
import { Order } from "src/app/models/transport.modul";
import { environment } from "src/environments/environment";
import { AlertService } from "../alert.service";

@Injectable({providedIn: 'root'})
export class CartService {
  existsInCart: boolean = false;
  existingInCart: any;
  quantity: number = 1;
  payChoice: string = '';
  transportChoice: number = 0;
  productsItem: Cart[] = [];
  all: Data[] = [];
  fullOrder: any[] = [];
  orderData: Orders[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ){}

  /* Kosár információk */
  addCart(products: Cart) {
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

  /* Vásárló adatai */
  addOrder(value: any){
    this.all = value;
    console.log(value)
  }

  getOrder(){
    return this.all
  }


  /* Adatok hozzáadása/lekérdezése/törlése adatbázisba */
  addFullOrder(list: any) {
    console.log(list)
    this.http.post<{order: Orders}>(environment.apiUrl + "orders", list)
    .subscribe(responseData => {
      responseData.order.carts = list[0];
      responseData.order.data = list[1];
      responseData.order.transport = list[2];
      responseData.order.pay = list[3];
    });
  }

  addFullOrderItem() {
    this.fullOrder.push(this.productsItem, this.all, this.transportChoice, this.payChoice);
    this.addFullOrder(this.fullOrder);
  }

}
