import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavemenuComponent } from './navemenu/navemenu.component';
import { ArticleGridComponent } from './article-grid/article-grid.component';
import { StoreGridComponent } from './store-grid/store-grid.component';
import { StoreNewComponent } from './store-new/store-new.component';
import { StoresActions } from './shared/store/stores.actions';
import { ArticlesActions } from './shared/store/articles.actions';
import { ConfigService } from './shared/api-settings/config.service';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState, rootReducer } from './shared/store/state';
import { ArticleNewComponent } from './article-new/article-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavemenuComponent,
    ArticleGridComponent,
    StoreGridComponent,
    StoreNewComponent,
    ArticleNewComponent
  ],
  imports: [
    NgReduxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'articlegrid', component: ArticleGridComponent },
      { path: 'storegrid', component: StoreGridComponent },    
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }, StoresActions, ArticlesActions, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
