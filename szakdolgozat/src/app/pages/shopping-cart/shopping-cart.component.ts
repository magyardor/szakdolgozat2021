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
  displayedColumns: string[] = ['name','price','image','quantity','total'];
  cartsList: any;
  fullPrice: any;
  fullQuantity: any;
  quantity: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private carts: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void{
    this.cartsList = this.carts.productsItem;
    console.log(this.cartsList.length)
    for(let i=0; i < this.cartsList.length; i++){
      this.quantity = this.cartsList[i].quantity;
      /* this.fullPrice = this.cartsList[i].price*this.quantity */
    }
    this.fullPrice = this.carts.totalPrice;
    this.fullQuantity = this.carts.totalQuantity;
  }

  ngAfterViewInit() {
    this.cartsList.paginator = this.paginator;
  }

  buy() {
    console.log(this.cartsList);
    this.carts.updateCart(this.cartsList);
    this.router.navigate(['/pay']);
  }

  plusButton(id: any){
    for(let i=0; i < this.cartsList.length; i++){
      if(this.cartsList[i].id === id){
        this.cartsList[i].quantity++;
        this.cartsList[i].total = this.cartsList[i].price*this.cartsList[i].quantity
        /* this.fullPrice = this.cartsList[i].price*this.quantity; */
      }
    }
  }

  minusButton(id: any) {
    for(let i=0; i < this.cartsList.length; i++){
      if(this.cartsList[i].id === id){
        if(this.cartsList[i].quantity > 0){
          this.cartsList[i].quantity--;
          this.cartsList[i].total = this.cartsList[i].price*this.cartsList[i].quantity
         /*  this.fullPrice = this.cartsList[i].price*this.quantity; */
        }
        if(this.cartsList[i].quantity <= 0){
          console.log(this.cartsList[i].id)
          console.log(i);
          /* this.carts.removeCart(i); */
        }
      }
    }

  }
}
