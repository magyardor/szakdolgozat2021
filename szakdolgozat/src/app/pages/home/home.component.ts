import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { News } from 'src/app/models/news.model';
import { Products } from 'src/app/models/products.model';
import { NewsService } from 'src/app/service/news/news.service';
import { ProductsService } from 'src/app/service/products/products.service';

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

  constructor(
    private newsService: NewsService,
    private productsService: ProductsService
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
    console.log(this.newsList)
  }

}
