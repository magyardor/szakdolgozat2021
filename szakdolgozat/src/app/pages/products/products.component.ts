import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carts } from 'src/app/models/cart';
import { Group, Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/service/products/products.service';
import { GroupService } from 'src/app/service/productsGroups/group.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: Products[] = [];
  prodSub: any;
  groupSub: any;
  groupList: Group[] = [];

  constructor(
    private productService: ProductsService,
    private group: GroupService,
    private router: Router,
    private cart: CartService
  ) { }

  async ngOnInit(){
    await this.productService.getProducts();
    this.prodSub = this.productService.getprodUpdatedListener()
    .subscribe(prod => {
      this.productList = prod;
    });

    await this.group.getGroups();
    this.groupSub = this.group.getgroupUpdatedListener()
    .subscribe(group => {
      this.groupList = group;
    });

  }

  onGetProduct(prod: any) {
    this.router.navigateByUrl("products-profile/" + prod);
  }

  buy(prod: Products){
    const cartItem = new Carts(prod);
    this.cart.addCart(cartItem);
  }

}
