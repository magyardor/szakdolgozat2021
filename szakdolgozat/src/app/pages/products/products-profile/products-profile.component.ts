import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/service/products/products.service';

@Component({
  selector: 'app-products-profile',
  templateUrl: './products-profile.component.html',
  styleUrls: ['./products-profile.component.scss']
})
export class ProductsProfileComponent implements OnInit {
  product: any;
  prodSub: any;
  productID: any;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.productID = params['id'];
    })
    this.prodSub = this.productService.getProduct(this.productID).subscribe((prod) => {
      this.product = prod;
    });
  }

}
