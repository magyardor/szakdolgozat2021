import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cart } from "src/app/models/cart";
import { Orders } from "src/app/models/orders.model";
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
  productsItem: any[] = [];
  all: any[] = [];
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
  addFullOrder(
    id: any,
    carts: any,
    data: any,
    transport: any,
    pay: string
  ) {
    const orderData = new FormData();
    orderData.append("carts", carts);
    orderData.append("data", data);
    orderData.append("transport", transport);
    orderData.append("transport", pay);
    /* this.fullOrder.push(this.productsItem, this.all, this.transportChoice, this.payChoice); */
    this.http.post<{order: Orders}>(environment.apiUrl + "orders", orderData)
    .subscribe(responseData => {
      const orders: Orders = {
        /* id: responseData.order.id, */
        id: id,
        carts: carts,
        data: data,
        transport: transport,
        pay: pay
      };
      this.orderData.push(orders);
      console.log(orderData)
    });
  }

  addFullOrderItem() {
    this.addFullOrder(0, this.productsItem, this.all, this.transportChoice, this.payChoice);
  }

}
