import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { Orders } from "../models/orders.model";
import { AlertService } from "./alert.service";

@Injectable({providedIn: 'root'})
export class OrdersService {
  private orders: Orders[] = [];
  private orderUpdate = new Subject<Orders[]>();

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
  ){}

  getOrders(){
    this.http.get<{message: string, orders: any}>(environment.apiUrl + "/api/orders")
    .pipe(map(ordersData => {
      return ordersData.orders.map((order: any) => {
        return {
          id: order._id,
          firstName: order.firstName,
          lastName: order.lastName,
          email: order.email,
          description: order.description,
          imagePath: order.imagePath,
        };
      });
    })
    ).subscribe(transformData => {
      this.orders = transformData;
      this.orderUpdate.next([...this.orders]);
    });
  }

  getUpdateOrderListener() {
    return this.orderUpdate.asObservable();
  }


  deleteOrders(id: any){
    return this.http.delete(environment.apiUrl + "/api/orders/" + id)
    .subscribe(() => {
      const updateOrder = this.orders.filter(x => x.id !== id);
      this.orders = updateOrder;
      this.orderUpdate.next([...this.orders]);
      this.alert.success('ALERT.SUCCESS.DELETE');
    }, error => {
      this.alert.error(error.error.message);
    });
  }
}
