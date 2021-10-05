import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products.model';
import { ProductsService } from 'src/app/service/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id','title','description','image','menu'];
  products: Products[] = [];
  isLoading = false;
  productsSub!: Subscription;

  constructor(
    private prodService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.prodService.getProducts();
    this.productsSub = this.prodService.getprodUpdatedListener()
    .subscribe((post: Products[]) => {
        this.isLoading = false;
        this.products = post;
    });
  }

  onModify(productsId: string){
    this.router.navigateByUrl("/admin/products-list/edit-products/" + productsId);
  }

  onDelete(productsId: string) {
    this.prodService.deleteProducts(productsId);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }


}
