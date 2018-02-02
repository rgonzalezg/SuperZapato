import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { IStore, IStores } from '../shared/interfaces';
import { StoresActions } from '../shared/store/stores.actions'
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-store-grid',
  templateUrl: './store-grid.component.html',
  styleUrls: ['./store-grid.component.css']
})
export class StoreGridComponent implements OnInit  {
  @select('stores') public stores: Observable<IStores>;
  selected: IStore //used for filtering
  constructor(private dataService: StoresActions) {
   
  }

  ngOnInit() {
    this.dataService.getStores();
  }

  removeStore(store: IStore): void {   
    this.dataService.deleteStore(store.id);      
  }

  saveEdit(): void {
    console.log(this.selected.id);
    this.dataService.updateStore(this.selected);
    this.selected = null;
  }

  showEdit(store: IStore): void {
    this.selected = {
      id : store.id,
      address : store.address,
      name : store.name
    };
  }

  hideEdit(): void {
    this.selected = null;
  }
}
