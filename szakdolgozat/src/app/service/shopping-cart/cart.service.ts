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
  orderFull: any;
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
    console.log(list)
    this.http.post<{order: Orders}>(environment.apiUrl + "orders", list)
    .subscribe(responseData => {
      const orders: Orders = {
        id: responseData.order.id,
        carts: [{
          id: responseData.order.carts[0].id,
          name: responseData.order.carts[0].name,
          description: responseData.order.carts[0].description,
          imagePath: responseData.order.carts[0].imagePath,
          price: responseData.order.carts[0].price,
          quantity: responseData.order.carts[0].quantity,
          total: responseData.order.carts[0].total
        }],
        data: [{
          city: responseData.order.data[0].city,
          city_transport: responseData.order.data[0].city_transport,
          email: responseData.order.data[0].email,
          fullName: responseData.order.data[0].fullName,
          fullName_transport: responseData.order.data[0].fullName_transport,
          phone: responseData.order.data[0].phone,
          street: responseData.order.data[0].street,
          street_transport: responseData.order.data[0].street_transport,
          taxNumber: responseData.order.data[0].taxNumber,
          taxNumber_transport: responseData.order.data[0].taxNumber_transport,
          zipCode: responseData.order.data[0].zipCode,
          zipCode_transport: responseData.order.data[0].zipCode_transport,
        }],
        transport: responseData.order.transport,
        pay: responseData.order.pay
      };
      console.log(orders);
      this.orderFull.push(orders);
      this.orderFullUpdate.next([...this.orderFull]);
    }, error => {
      this.alert.error(error.error.message);
    }
    );
  }

  addFullOrderItem() {
    this.fullOrder.push(
      this.productsItem,
      this.all,
      this.transportChoice,
      this.payChoice
    );
    this.addFullOrder(this.fullOrder);
  }

}
