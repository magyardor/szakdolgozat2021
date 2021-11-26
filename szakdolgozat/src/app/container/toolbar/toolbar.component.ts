import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/products.model';
import { GroupService } from 'src/app/service/productsGroups/group.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  cartsList: any;
  groupSub: any;
  x: any;
  groupList: Group[] = [];

  constructor(
    private carts: CartService,
    private group: GroupService,
  ) { }

  async ngOnInit() {
    this.cartsList = this.carts.productsItem;
    await this.group.getGroups();
    this.groupSub = this.group.getgroupUpdatedListener()
    .subscribe(group => {
      this.groupList = group;
    });
  }

  toggleBadgeVisibility() {
    this.cartsList = this.carts.productsItem;
  }

  open(event: any) {
    console.log(event)
  }

}
