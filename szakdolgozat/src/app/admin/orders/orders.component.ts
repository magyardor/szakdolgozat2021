import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Order, Orders } from 'src/app/models/orders.model';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string [] = ['id', 'email', 'description', 'menu'];
  orders!: MatTableDataSource<Orders>;
  isLoading = false;
  orderSub!: Subscription;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders();
    this.orderSub = this.orderService.getUpdateOrderListener()
    .subscribe((order: Orders[]) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(order);
      this.orders.paginator = this.paginator;
    });
  }

  onDelete(id: string) {
    this.orderService.deleteOrders(id);
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }

}
