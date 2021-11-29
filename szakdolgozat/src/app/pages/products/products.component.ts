import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Group, Products } from 'src/app/models/products.model';
import { BuyDialogComponent } from 'src/app/service/dialog/buy-dialog/buy-dialog.component';
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
  groupID: any;
  cols: number = 4;

  constructor(
    private productService: ProductsService,
    private group: GroupService,
    private router: Router,
    private cart: CartService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(){
    this.groupID = await this.group.groupID;
    console.log(this.groupID)

    if(this.groupID === 0){
      await this.productService.getProducts();
      this.prodSub = this.productService.getprodUpdatedListener()
      .subscribe(prod => {
        this.productList = prod;
      });
    }
    else{
      await this.productService.getProducts();
      this.prodSub = this.productService.getprodUpdatedListener()
      .subscribe(prod => {
        this.productList = prod;
        this.productList = this.productList.filter(x => x.productsGroup === this.groupID);
      })
    }
    /* await this.group.getGroups();
    this.groupSub = this.group.getgroupUpdatedListener()
    .subscribe(group => {
      this.groupList = group;
    }); */

  }

  onGetProduct(prod: any) {
    this.router.navigateByUrl("products-profile/" + prod);
  }

  buy(prod: Products){
    console.log(prod)
    const cartItem = new Cart(prod);
    this.cart.addCart(cartItem);
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      height: '300px',
      width: '500px',
    });
  }

}
