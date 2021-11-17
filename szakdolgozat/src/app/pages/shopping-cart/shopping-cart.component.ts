import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Carts } from 'src/app/models/cart';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name','description','price','image','quantity','afa','ar_afa'];
  cartsList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private carts: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void{
    this.cartsList = this.carts.productsItem;
  }

  ngAfterViewInit() {
    this.cartsList.paginator = this.paginator;
  }

  buy() {
    this.router.navigate(['/pay']);
  }
}
