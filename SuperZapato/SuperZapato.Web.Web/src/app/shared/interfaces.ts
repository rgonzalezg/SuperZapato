export interface IStore {
  id?: number;
  name?: string;
  address?: string;
}

export interface IArticle {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  total_In_Shelf?: number;
  total_In_Vault?: number;
  storeId?: number;
}

export interface IStores {
  selected: IStore;
  list: IStore[];
}

export interface IArticles {
  selected: IArticle;
  list: IArticle[];
}
