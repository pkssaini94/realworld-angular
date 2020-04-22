import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ArticleListConfig } from '../models/article-list-config';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private apiService: ApiService) { }

  getArticles(config: ArticleListConfig): Observable<{ articles: Article[], articlesCount: number }> {
    const params = {};

    // Convert any filters over to query param
    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService.get('/articles' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }
}
