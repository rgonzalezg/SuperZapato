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
  IStore
} from '../interfaces';
import { ConfigService } from '../api-settings/config.service';

@Injectable()
export class StoresActions {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  _baseUrl: string = '';
  static STORES_GET = 'STORES_GET';
  static STORE_GET = 'STORE_GET';
  static STORE_ADD = 'STORE_ADD';
  static STORE_UPDATE = 'STORE_UPDATE';
  static STORE_DELETE = 'STORE_DELETE';


  constructor(private http: Http,
    private configService: ConfigService, private ngRedux: NgRedux<IAppState>) {
    this._baseUrl = configService.getApiURI();
  }

  //************************************************************   STORES SERVICES ************************************************************************ /
  //get all Stores
  getStores() {
     this.http.get(this._baseUrl + 'stores')
      .subscribe((res) => {
        // get users
        const list = res.json();
        // populate users state (dispatch action)
        this.ngRedux.dispatch({
          type: StoresActions.STORES_GET,
          payload: {
            list
          }
        });
        // Set the first user as active (dispatch action)
        //this.setActiveUser(list[0].id);
       }, error => {

         console.log('Failed to load stores.' + error);
       });
  }

  //get a specific Store by Id
  getStore(id: number): Observable<IStore> {
    return this.http.get(this._baseUrl + 'stores/' + id)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  //create a new Store
  createStore(name: string, address: string) {
    let body = JSON.stringify({
      name: name,
      address: address
    });

    this.http.post(this._baseUrl + 'stores', body, { headers: this.headers })
      .toPromise()
      .then((res) => {
        // add new user
        this.ngRedux.dispatch({
          type: StoresActions.STORE_ADD,
          payload: { store: res.json() }
        });

        // select last added user
        //this.setActiveUser(res.json().id);
      },
      (error) => console.log(error));
  }

  //updates a Store
  updateStore(store: IStore) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    console.log(this._baseUrl + 'stores/' + store.id);
    this.http.put(this._baseUrl + 'stores/' + store.id, JSON.stringify(store), {
      headers: headers
    })
      .subscribe((res: Response) => {
        this.ngRedux.dispatch({
          type: StoresActions.STORE_UPDATE,
          payload: { store: store }
        });
      },
      error => {
        console.log('Failed while trying to update the store. ' + error);
      });    
  }

  //delete Store
  deleteStore(id: number) {
    return this.http.delete(this._baseUrl + 'stores/' + id)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: StoresActions.STORE_DELETE,
          payload: { id }
        });        
      }, error => {
        console.log('Failed to delete store ' + error);
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
