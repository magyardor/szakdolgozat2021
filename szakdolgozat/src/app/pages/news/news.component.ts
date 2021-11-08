import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: News [] = [];
  newsSubs: any;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.newsService.getNews();
    this.newsSubs = this.newsService.getNewsUpdateListener().subscribe((news: News[]) => {
      this.newsList = news;
    });
  }

  onGetNew(newsID: any) {
    console.log(newsID);
    this.router.navigateByUrl("/news-profile/" + newsID);
  }

}
