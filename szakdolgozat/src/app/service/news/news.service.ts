import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';
import { News } from 'src/app/models/news.model';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
private news: News[] = [];
private newsUpdated = new Subject<News[]>();

constructor(
  private http: HttpClient,
  private router: Router,
  private alert: AlertService
) { }

  getNews() {
    this.http.get<{message: string, news: any}>("http://localhost:3000/api/news")
      .pipe(map(newsData => {
          return newsData.news.map((news: any) => {
            return {
              title: news.title,
              description: news.description,
              id: news._id,
              imagePath: news.imagePath
            };
          });
        })
      ).subscribe(transformData => {
        this.news = transformData;
        this.newsUpdated.next([...this.news]);
      });
  }

  getNewsUpdateListener() {
    return this.newsUpdated.asObservable();
  }

  getNew(id: any) {
    return this.http.get<{_id: any, title: string, description: string, imagePath: string}>("http://localhost:3000/api/news/" + id);
  }

  addNews(title: string, description: string, image: File | string) {
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("description", description);
    newsData.append("image", image, title);
    this.http.post<{message: string, news: News}>("http://localhost:3000/api/news", newsData)
    .subscribe(responseData => {
      const news: News = {
        id: responseData.news.id,
        title: title,
        description: description,
        imagePath: responseData.news.imagePath
      };
      this.news.push(news);
      this.newsUpdated.next([...this.news]);
      this.alert.success('ALERT.SUCCESS.ADD')
      this.router.navigate(["/admin/news-list"]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  updateNews(id: any, title: string, description: string, image: File | string){
    let newsData: News | FormData;
    if(typeof(image) === "object"){
      newsData = new FormData();
      newsData.append("id", id),
      newsData.append("title", title),
      newsData.append("description", description),
      newsData.append("image", image, title)
    }
    else{
      newsData = {id: id, title: title, description: description, imagePath: image};
    }
    this.http.put("http://localhost:3000/api/news/" + id, newsData)
      .subscribe(response => {
        const updatedNews = [...this.news];
        const oldNewsIndex = updatedNews.findIndex(p => p.id === id);
        const news: News = {
          id: id,
          title: title,
          description: description,
          imagePath: ""
        };
        updatedNews[oldNewsIndex] = news;
        this.news = updatedNews;
        this.newsUpdated.next([...this.news]);
        this.alert.success('ALERT.SUCCESS.MODIFY');
        this.router.navigate(["/admin/news-list"]);
      }, error => {
        this.alert.error(error.error.message);
      });
  }

  deleteNews(newsID: any) {
    return this.http.delete("http://localhost:3000/api/news/" + newsID).subscribe(() =>{
      const updatedNews = this.news.filter(post => post.id !== newsID);
      this.news = updatedNews;
      this.alert.success('ALERT.SUCCESS.DELETE');
      this.newsUpdated.next([...this.news]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }
}
