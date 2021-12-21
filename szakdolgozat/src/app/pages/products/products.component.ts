import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.groupID = params['id'];
      this.ngOnInit();
    })
   }

  ngOnInit(){
    if(this.groupID == 0){
      this.productService.getProducts();
      this.prodSub = this.productService.getprodUpdatedListener()
      .subscribe(prod => {
        this.productList = prod;
      });
    }
    else{
      this.productService.getProducts();
      this.prodSub = this.productService.getprodUpdatedListener()
      .subscribe(prod => {
        this.productList = prod;
        this.productList = this.productList.filter(x => x.productsGroup === this.groupID);
      })
    }
    this.group.getGroups();
    this.groupSub = this.group.getgroupUpdatedListener()
    .subscribe(group => {
      this.groupList = group;
      this.groupList = this.groupList.filter(x => x.id === this.groupID);
    });

  }

  onGetProduct(prod: any) {
    this.router.navigateByUrl("products-profile/" + prod);
  }

  buy(prod: Products){
    const cartItem = new Cart(prod);
    this.cart.addCart(cartItem, 1);
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      height: '300px',
      width: '500px',
    });
  }

}
