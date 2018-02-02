import { combineReducers } from 'redux';

import { StoresReducer } from './stores.reducer';
import { ArticlesReducer } from './articles.reducer';
import { IStore, IArticle } from '../interfaces';

export class IAppState {
  stores: IStore;
  articles: IArticle;
};

export const rootReducer = combineReducers<IAppState>({
  stores: StoresReducer,
  articles: ArticlesReducer
});


