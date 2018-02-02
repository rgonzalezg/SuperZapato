import { StoresActions } from './stores.actions';
import { IStores } from '../interfaces';

const INITIAL_STATE: IStores = {
  list: [],
  selected: {}
};

export function StoresReducer(state: IStores = INITIAL_STATE, action: any): any {
  let index, active, list;

  switch (action.type) {
    case StoresActions.STORES_GET:
      {
        console.log('here');
        return Object.assign({}, state, { list: action.payload.list });
      }

    case StoresActions.STORE_DELETE:
      {
        list = state.list
          .filter(({ id }) => id !== action.payload.id);
        return Object.assign({}, state, { list });
      }

    case StoresActions.STORE_ADD:
      {
        state.list.push(action.payload.store);
        return state;
      }

    case StoresActions.STORE_UPDATE:
      {
        list = [...state.list];
        index = list.findIndex(({ id }) => id === action.payload.store.id);
        list[index] = action.payload.store;
        return Object.assign({}, state, { list });
      }
    default:
      { return state; }
  }
}

