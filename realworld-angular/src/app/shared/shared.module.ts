import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from './layout';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleMetaComponent } from './article/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article/article-preview/article-preview.component';
import { FollowButtonComponent } from './button/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './button/favorite-button/favorite-button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FollowButtonComponent,
    FavoriteButtonComponent
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent
  ]
})
export class SharedModule { }
