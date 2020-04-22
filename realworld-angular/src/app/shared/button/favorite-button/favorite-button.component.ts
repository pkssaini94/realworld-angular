import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input()
  article: Article;

  @Output()
  toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  constructor() { }

  ngOnInit() {
  }

}
