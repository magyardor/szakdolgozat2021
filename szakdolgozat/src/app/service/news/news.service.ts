import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    this.http.get<{message: string, news: any}>( environment.apiUrl + "/api/news")
      .pipe(map(newsData => {
          return newsData.news.map((news: any) => {
            return {
              title: news.title,
              description: news.description,
              id: news._id,
              imagePath: environment.apiUrl + news.imagePath,
              startDate: news.startDate,
              endDate: news.endDate
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
    return this.http.get<{
      _id: any,
      title: string,
      description: string,
      imagePath: string,
      startDate: Date,
      endDate: Date
    }>( environment.apiUrl + "/api/news/" + id);
  }

  addNews(title: string, description: string, image: File | string, startDate: any, endDate: any) {
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("description", description);
    newsData.append("image", image, title);
    newsData.append("startDate", startDate);
    newsData.append("endDate", endDate);
    this.http.post<{message: string, news: News}>( environment.apiUrl + "/api/news", newsData)
    .subscribe(responseData => {
      const news: News = {
        id: responseData.news.id,
        title: title,
        description: description,
        imagePath: responseData.news.imagePath,
        startDate: startDate,
        endDate: endDate
      };
      this.news.push(news);
      this.newsUpdated.next([...this.news]);
      this.alert.success('ALERT.SUCCESS.ADD')
      this.router.navigate(["/admin/news-list"]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }

  updateNews(id: any, title: string, description: string, image: any, startDate: any, endDate: any){
    let newsData: News | FormData;
    if(typeof(image) === "object"){
      newsData = new FormData();
      newsData.append("id", id);
      newsData.append("title", title);
      newsData.append("description", description);
      newsData.append("image", image, title);
      newsData.append("startDate", startDate);
      newsData.append("endDate", endDate);
    }
    else{
      newsData = {
        id: id,
        title: title,
        description: description,
        imagePath: image,
        startDate: startDate,
        endDate: endDate
      };
    }
    this.http.put( environment.apiUrl + "/api/news/" + id, newsData)
      .subscribe(response => {
        this.router.navigate(["/admin/news-list"]);
        /* const updatedNews = [...this.news];
        const oldNewsIndex = updatedNews.findIndex(p => p.id === id);
        const news: News = {
          id: id,
          title: title,
          description: description,
          imagePath: image,
          startDate: startDate,
          endDate: endDate };*/

        /* updatedNews[oldNewsIndex] = news;
        this.news = updatedNews;
        this.newsUpdated.next([...this.news]); */
        this.alert.success('ALERT.SUCCESS.MODIFY');
        this.router.navigate(["/admin/news-list"]);
      }, error => {
        this.alert.error(error.error.message);
      });
  }

  deleteNews(newsID: any) {
    return this.http.delete( environment.apiUrl + "/api/news/" + newsID).subscribe(() =>{
      const updatedNews = this.news.filter(post => post.id !== newsID);
      this.news = updatedNews;
      this.alert.success('ALERT.SUCCESS.DELETE');
      this.newsUpdated.next([...this.news]);
    }, error => {
      this.alert.error(error.error.message);
    });
  }
}
