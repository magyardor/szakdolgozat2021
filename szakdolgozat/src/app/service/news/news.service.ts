import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { News } from 'src/app/models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

constructor(
  private http: HttpClient,
  private router: Router,
) { }

  getNews(newsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${newsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, news: any, maxNews: number}>("" + queryParams)
      .pipe(map(newsData => {
        return {news: newsData.news.map((post: any) => {
          return {
            title: post.title,
            description: post.description,
            id: post._id,
            imagePath: post.imagePath
          };
        }), maxNews: newsData.maxNews}
      }))
  }

  getNew(id: any) {
    return this.http.get<{_id: any, title: string, description: string, imagePath: string}>("http://localhost:3000/api/news/" + id);
  }

  addNews(title: string, description: string, image: File) {
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("description", description);
    newsData.append("image", image, title);
    this.http.post<{message: string, news: News}>("http://localhost:3000/api/news", newsData)
    .subscribe(responseData => {
      this.router.navigate(["/admin/news-list"]);
    });
  }

  updateNews(id: any, title: string, description: string, image: string){
    let newsData;
    if(typeof(image) === "object"){
      const newsData = new FormData();
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
        this.router.navigate(["/admin/news-list"]);
      });
  }

  deleteNews(newsID: any) {
    return this.http.delete("http://localhost:3000/api/news/" + newsID);
  }
}
