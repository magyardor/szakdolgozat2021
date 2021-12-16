import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id','name','description','price','image','menu'];
  products!: MatTableDataSource<Products>;
  isLoading = false;
  productsSub!: Subscription;
  @ViewChild('paginator') paginator!: MatPaginator;

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
        this.products = new MatTableDataSource(post);
        this.products.paginator = this.paginator;
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
