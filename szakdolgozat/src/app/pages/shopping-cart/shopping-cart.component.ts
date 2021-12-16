import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/service/productsGroups/group.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{
  displayedColumns: string[] = ['name','price','image','quantity','total'];
  cartsList: any;
  fullPrice: any;
  fullQuantity: any;
  quantity: number = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private carts: CartService,
    private router: Router,
    private group: GroupService,
  ) { }

  ngOnInit(): void{
    this.cartsList = this.carts.productsItem;
    for(let i=0; i < this.cartsList.length; i++){
      this.quantity = this.cartsList[i].quantity;
    }
    this.fullPrice = this.carts.totalPrice;
    this.fullQuantity = this.carts.totalQuantity;
  }

  navigateProducts(id: any) {
    this.group.selectedGroup(id);
    this.router.navigateByUrl("products/" + id)
  }

  buy() {
    this.carts.updateCart(this.cartsList);
    this.router.navigate(['/pay']);
  }

  plusButton(id: any){
    this.carts.plusQuantity(id)
  }

  minusButton(id: any) {
    this.carts.reductionQuantity(id);
  }
}
