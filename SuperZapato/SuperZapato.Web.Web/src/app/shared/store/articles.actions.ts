import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgRedux } from '@angular-redux/store'
import { IAppState } from './state';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {
  IArticle
} from '../interfaces';
import { ConfigService } from '../api-settings/config.service';

@Injectable()
export class ArticlesActions {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  _baseUrl: string = '';
  static ARTICLES_GET = 'ARTICLES_GET';
  static ARTICLE_GET = 'ARTICLE_GET';
  static ARTICLE_ADD = 'ARTICLE_ADD';
  static ARTICLE_UPDATE = 'ARTICLE_UPDATE';
  static ARTICLE_DELETE = 'ARTICLE_DELETE';


  constructor(private http: Http,
    private configService: ConfigService, private ngRedux: NgRedux<IAppState>) {
    this._baseUrl = configService.getApiURI();
  }

  //************************************************************   ARTICLES SERVICES ************************************************************************ /
  //get all Articles
  getArticles() {
     this.http.get(this._baseUrl + 'articles')
      .subscribe((res) => {
        // get users
        const list = res.json();
        // populate users state (dispatch action)
        this.ngRedux.dispatch({
          type: ArticlesActions.ARTICLES_GET,
          payload: {
            list
          }
        });
        // Set the first user as active (dispatch action)        
       }, error => {

         console.log('Failed to load articles.' + error);
       });
  }

  //get a specific Article by Id
  getArticle(id: number): Observable<IArticle> {
    return this.http.get(this._baseUrl + 'articles/' + id)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  //create a new Article
  createArticle(name: string, description: string, price: number, total_in_shelf: number, total_in_vault: number, storeid: number) {

    let body = JSON.stringify({
      name: name,
      description: description,
      price : price,
      total_in_shelf : total_in_shelf,
      total_in_vault: total_in_vault,
      storeid: storeid
    });

    this.http.post(this._baseUrl + 'articles', body, { headers: this.headers })
      .toPromise()
      .then((res) => {
        // add new user
        this.ngRedux.dispatch({
          type: ArticlesActions.ARTICLE_ADD,
          payload: { article: res.json() }
        });

        // select last added user
        //this.setActiveUser(res.json().id);
      },
      (error) => console.log(error));
  }

  //updates a Article
  updateArticle(article: IArticle) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log(this._baseUrl + 'articles/' + article.id);
    this.http.put(this._baseUrl + 'articles/' + article.id, JSON.stringify(article), {
      headers: headers
    })
      .subscribe((res: Response) => {
        this.ngRedux.dispatch({
          type: ArticlesActions.ARTICLE_UPDATE,
          payload: { article: article }
        });
      },
      error => {
        console.log('Failed while trying to update the article. ' + error);
      });    
  }

  //delete Article
  deleteArticle(id: number) {
    return this.http.delete(this._baseUrl + 'articles/' + id)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: ArticlesActions.ARTICLE_DELETE,
          payload: { id }
        });        
      }, error => {
        console.log('Failed to delete article ' + error);
      });
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }

}
