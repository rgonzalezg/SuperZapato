import { Component, OnInit } from '@angular/core';
import { ArticlesActions } from '../shared/store/articles.actions';
import { IArticle, IStores } from '../shared/interfaces'
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StoresActions } from '../shared/store/stores.actions'
@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {
  @select('stores') public stores: Observable<IStores>;
  constructor(private articlesActions: ArticlesActions, private storesActions: StoresActions) { }

  ngOnInit() {
    this.storesActions.getStores();   
  }

  newArticle(name: string, description: string, price: number, total_in_shelf: number, total_in_vault: number, storeid: number) {
    this.articlesActions.createArticle(name, description, price, total_in_shelf, total_in_vault, storeid);
  }
 
}
