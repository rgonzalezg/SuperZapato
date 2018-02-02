import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { StoresActions } from '../shared/store/stores.actions';
import { IStore } from '../shared/interfaces'
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-store-new',
  templateUrl: './store-new.component.html',
  styleUrls: ['./store-new.component.css']
})
export class StoreNewComponent implements OnInit {
  store: IStore;
  constructor(private storesActions: StoresActions) {
  }

  ngOnInit() {
  }
  newStore(name: string, address: string) {
    this.storesActions.createStore(name, address);
  }
}
