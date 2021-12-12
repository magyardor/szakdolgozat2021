import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { News } from 'src/app/models/news.model';
import { Products } from 'src/app/models/products.model';
import { BuyDialogComponent } from 'src/app/service/dialog/buy-dialog/buy-dialog.component';
import { NewsService } from 'src/app/service/news/news.service';
import { ProductsService } from 'src/app/service/products/products.service';
import { CartService } from 'src/app/service/shopping-cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList: News [] = [];
  productsList: Products [] = [];
  newsSub: any;
  productsSub: any;
  cols: number = 4;

  constructor(
    private newsService: NewsService,
    private productsService: ProductsService,
    private router: Router,
    private cart: CartService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(){
    await this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener().subscribe((news: News[]) => {
      this.newsList = news;
    });
    await this.productsService.getProducts();
    this.productsSub = this.productsService.getprodUpdatedListener().subscribe((prod: Products[]) => {
      this.productsList = prod;
    })
  }

  onGetNew(newsID: any) {
    console.log(newsID);
    this.router.navigateByUrl("/news-profile/" + newsID);
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
