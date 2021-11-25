import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Cart } from "src/app/models/cart";
import { Carts, Data, Order, Orders } from "src/app/models/orders.model";
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
  fullOrder: Orders[] = [];
  orderFull: any[] = [];
  orderFullUpdate: any;

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
    const listData = JSON.stringify(list);
    console.log(list)
    this.http.post<{order: Orders}>(environment.apiUrl + "orders", listData)
    .subscribe(responseData => {
      const data: Orders = {
        orders: list.orders
      }
      console.log(data)
      this.orderFull.push(data);
    }, error => {
      this.alert.error(error.error.message);
    }
    );
  }

  addFullOrderItem() {
    this.fullOrder.push(
      {"orders": [{"carts": this.productsItem, "data": this.all, "transport": this.transportChoice, "pay": this.payChoice}]}
    );
    this.addFullOrder(this.fullOrder);
  }

}
