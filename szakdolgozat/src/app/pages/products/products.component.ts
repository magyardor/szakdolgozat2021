import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/service/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: Products[] = [];
  prodSub: any;

  constructor(
    private productService: ProductsService
  ) { }

  async ngOnInit(){
    await this.productService.getProducts();
    this.prodSub = this.productService.getprodUpdatedListener()
    .subscribe(prod => {
      this.productList = prod;
    });
  }

}
