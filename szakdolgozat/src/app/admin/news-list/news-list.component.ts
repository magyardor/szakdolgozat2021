import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/service/news/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id','title','description','image','menu'];
  news: News[] = [];
  isLoading = false;
  newsSub!: Subscription;

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.newsService.getNews();
    this.newsSub = this.newsService.getNewsUpdateListener()
    .subscribe((post: News[]) => {
        this.isLoading = false;
        this.news = post;
    });
  }

  onModify(newsId: string){
    this.router.navigateByUrl("/admin/news-list/edit/" + newsId);
  }

  onDelete(newsId: string) {
    this.newsService.deleteNews(newsId);
  }

  ngOnDestroy() {
    this.newsSub.unsubscribe();
  }

}
