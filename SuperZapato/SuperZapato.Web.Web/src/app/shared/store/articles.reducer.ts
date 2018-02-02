import { ArticlesActions } from './articles.actions';
import { IArticles } from '../interfaces';

const INITIAL_STATE: IArticles = {
  list: [],
  selected: {}
};

export function ArticlesReducer(state: IArticles = INITIAL_STATE, action: any): any {
  let index, active, list;

  switch (action.type) {
    case ArticlesActions.ARTICLES_GET:
      {       
        return Object.assign({}, state, { list: action.payload.list });
      }

    case ArticlesActions.ARTICLE_DELETE:
      {
        list = state.list
          .filter(({ id }) => id !== action.payload.id);
        return Object.assign({}, state, { list });
      }

    case ArticlesActions.ARTICLE_ADD:
      {
        state.list.push(action.payload.article);
        return state;
      }

    case ArticlesActions.ARTICLE_UPDATE:
      {
        list = [...state.list];
        index = list.findIndex(({ id }) => id === action.payload.article.id);
        list[index] = action.payload.article;
        return Object.assign({}, state, { list });
      }
    default:
      { return state; }
  }
}

