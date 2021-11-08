import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news/news.service';

@Component({
  selector: 'app-news-profile',
  templateUrl: './news-profile.component.html',
  styleUrls: ['./news-profile.component.scss']
})
export class NewsProfileComponent implements OnInit {
  news!: any;
  newsID!: any;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(){
    this.route.params.subscribe(params => {
      this.newsID = params['id'];
    })
    this.news = await this.newsService.getNew(this.newsID);
    console.log(this.news)
  }

}
