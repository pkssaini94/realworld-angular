import { Component, OnInit } from '@angular/core';
import { TagsService } from '../core/services/tags.service';
import { ArticleListConfig } from '../core/models/article-list-config';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  limit=10;
  isAuthenticated: boolean;
  tags: Array<string> = [];
  articleListConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(
    private router: Router,
    private tagService: TagsService,
    private userService: UserService) { }

  ngOnInit() {

    this.userService.isAuthenticated.subscribe(authenticate => {
      this.isAuthenticated = authenticate;

      if (authenticate) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }

    });


    // Get all tags data
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }


  // Set article input request based on user authenticate on not.
  setListTo(type: string, filters: Object = {}) {
    if (type == 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.articleListConfig = { type: type, filters: filters }
  }

}
