import { Component, OnInit, Input } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  @Input()
  limit: number;

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.articleConfig = config;
      this.currentPage = 1;
      this.getArticleDetails();
    }
  }

  articles: Article[];
  articleConfig: ArticleListConfig;
  currentPage: number = 1;
  totalPages: Array<number> = [1];
  loading: boolean = false;

  constructor(private articleService: ArticleService) { }

  getArticleDetails() {
    this.loading = true;
    this.articles = [];

    if (this.limit) {
      this.articleConfig.filters.limit = this.limit;
      this.articleConfig.filters.offset = (this.limit * (this.currentPage - 1));
    }

    this.articleService.getArticles(this.articleConfig)
      .subscribe(data => {
        console.log(data);

        this.loading = false;
        this.articles = data.articles;
        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)),
          (value, index) => index + 1);
      });
  }

}
