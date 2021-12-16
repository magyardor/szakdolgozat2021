import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  news!: MatTableDataSource<News>;
  isLoading = false;
  newsSub!: Subscription;
  @ViewChild('paginator') paginator!: MatPaginator;

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
        this.news = new MatTableDataSource(post);
        this.news.paginator = this.paginator;
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
