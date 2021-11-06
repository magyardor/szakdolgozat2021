import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList: News [] = [];
  newsSub: any;

  constructor(
    private newsService: NewsService,
  ) { }

  async ngOnInit(){
    await this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener().subscribe((news: News[]) => {
      this.newsList = news;
    });
    console.log(this.newsList)
  }

}
