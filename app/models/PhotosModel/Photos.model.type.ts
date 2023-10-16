import type {IPhoto} from '_services';
import type {CollectionHolder} from '_utils/CollectionHolder';

export type IPaginationModel<T> = {
  identifiers: CollectionHolder<number>;
  isPullToRefresh: boolean;
  list: Array<T>;
  loadMore: () => Promise<void> | undefined;
  pullToRefresh: () => Promise<void>;
  totalResults: number;
};

export type IPhotosModel = IPaginationModel<IPhoto>;
