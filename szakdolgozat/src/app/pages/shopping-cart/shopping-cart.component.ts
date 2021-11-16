import { Component, OnInit } from '@angular/core';
import { Carts } from 'src/app/models/cart';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = ['name','description','price','image','quantity'];
  cartsList: Carts[] = [];

  constructor(
    private carts: CartService
  ) { }

  ngOnInit(): void{
    this.cartsList = this.carts.productsItem;
  }


}
