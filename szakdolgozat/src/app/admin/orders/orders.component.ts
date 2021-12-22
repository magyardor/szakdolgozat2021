import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Orders } from 'src/app/models/orders.model';
import { OrdersService } from 'src/app/service/orders.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: any;
  ordersSub: any;
  total: any;
  panelOpenState: boolean = false;

  constructor(
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  async getOrderList() {
    await this.orderService.getOrders();
    this.ordersSub = this.orderService.getUpdateOrderListener()
    .subscribe((order: Orders[]) => {
      this.orderList = order;
      for(let i=0; i<order.length; i++){
        this.total = order[i].orders[0].carts.price * order[i].orders[0].carts.price
      }
    });
  }

  onDelete(id: any) {
    this.orderService.deleteOrders(id);
  }

}
