import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IArticle, IArticles } from '../shared/interfaces'
import { ArticlesActions } from '../shared/store/articles.actions'

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs'; 
@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent implements OnInit   {

  @select('articles') public articles: Observable<IArticles>;
  selected: IArticle //used for filtering
  constructor(private articlesActions: ArticlesActions) {

  }

  ngOnInit() {
    this.articlesActions.getArticles();
  }
}
