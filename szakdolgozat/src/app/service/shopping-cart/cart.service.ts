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
  fullOrder: any[] = [];
  orderFull: any[] = [];
  orderFullUpdate = new Subject<Orders[]>();
  orderID: any;
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private alert: AlertService
  ){}

  /* Kosár információk */
  addCart(products: Cart, quantity: number) {
    if(this.productsItem.length > 0){
      this.existingInCart = this.productsItem.find(x => x.name === products.name);
      this.existsInCart = (this.existingInCart != undefined);
    }
    if(this.existsInCart) {
      this.existingInCart.quantity++;
    }
    else {
      products.quantity = quantity;
      this.productsItem.push(products);
      sessionStorage.setItem('products', JSON.stringify(products));
    }

    this.totalPrices();
  }

  updateCart(list: any){
    this.productsItem = list;
    this.totalPrices();
    sessionStorage.setItem('updateProducts', JSON.stringify(list));
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
    this.existingInCart = this.productsItem.find(x => x.id === cartItem);
    if(this.existingInCart.quantity === 1)
    {
      this.removeCart(cartItem);
    }
    else{
      this.existingInCart.quantity--;
      this.totalPrices();
    }
  }

  plusQuantity(cartItem: any){
    this.existingInCart = this.productsItem.find(x => x.id === cartItem);
    if(this.existingInCart.quantity === 0){
      this.removeCart(cartItem);
    }
    else{
      this.existingInCart.quantity++;
      this.totalPrices();
    }
  }

  removeCart(cartItem: any){
    this.productsItem.forEach((value,index) => {
      if(value.id === cartItem){
        this.productsItem.splice(index,1);
        this.totalPrices();
      }
    });
  }

  getprodUpdatedListener() {
    return this.orderFullUpdate.asObservable();
  }

  /* Vásárló adatai */
  addOrder(value: any){
    this.all = value;
    sessionStorage.setItem('data', JSON.stringify(value));
  }

  getOrder(){
    return this.all
  }

  addFullOrderItem(grandTotal: any, orderTotal: any) {
    this.fullOrder.push(
      {"orders": [{"carts": this.productsItem, "data": this.all, "transport": this.transportChoice, "pay": this.payChoice, "grandTotal": grandTotal, "orderTotal": orderTotal}]}
    );
    const listData = this.fullOrder;
    console.log(listData)
    this.http.post<{orders: Orders}>(environment.apiUrl + "/api/orders", listData[0])
    .subscribe(responseData => {
      const data: Orders = {
        orders: listData[0].orders[0],
        id: responseData.orders.id
      }
      this.orderFull.push(data);
      this.orderID = this.orderFull[0].id;
      this.orderFullUpdate.next([...this.orderFull]);
      this.alert.success('ALERT.SUCCESS.ADD')
      sessionStorage.clear();
    }, error => {
      this.alert.error(error.error.message);
    }
    );
  }

}
