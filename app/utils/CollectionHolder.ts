import {makeAutoObservable} from 'mobx';
import {debounce} from 'lodash';

export enum LoadState {
  ready = 'ready',
  loading = 'loading',
  pullToRefreshing = 'pullToRefreshing',
  loadingMore = 'loadingMore',
  error = 'error',
}

interface Range {
  index: number;
  count: number;
}

export interface IDataHolderError {
  type?: string;
  code?: string;
  msg: string;
}

interface Options {
  pageSize?: number;
}

type Collection<T> = T[];

export class CollectionHolder<T> {
  public error?: IDataHolderError;
  public data: Collection<T> = [];
  private _visibleRange: Range = {index: 0, count: 0};
  private _state: LoadState = LoadState.loading;
  private _lastDataLength = 0;
  private readonly _pageSize: number;

  public constructor(opts?: Options) {
    makeAutoObservable(this);
    const op = opts || {};
    this._pageSize = op.pageSize || 10000;

    this.performChangeVisibleRange = debounce(
      this.performChangeVisibleRange,
      200,
    );
  }

  public setData(data: Collection<T>) {
    switch (this._state) {
      case LoadState.loadingMore:
        this.data = [...this.data, ...data];
        break;
      case LoadState.ready:
      case LoadState.loading:
      case LoadState.pullToRefreshing:
      default:
        this.data = data;
        break;
    }

    this._lastDataLength = data.length;
    this._setState(LoadState.ready);

    return this;
  }

  public get offset(): number | undefined {
    return this.isLoadingMore ? this.data.length : this._visibleRange.index;
  }

  public get pageCount(): number | undefined {
    return this._visibleRange.count || undefined;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public setError(error: IDataHolderError, isNotClear = false) {
    if (!isNotClear) {
      this.data = [];
    }
    this.error = error;
    this._setState(LoadState.error);

    return this;
  }

  /* loading */

  public setLoading() {
    this.data = [];
    this._setState(LoadState.loading);

    return this;
  }

  public get isLoadingAllowed(): boolean {
    return this._state === LoadState.ready || this._state === LoadState.error;
  }

  public get isLoading() {
    return this._state === LoadState.loading;
  }

  /* PullToRefresh */

  public setPullToRefreshing() {
    this._setState(LoadState.pullToRefreshing);

    return this;
  }

  public get isPullToRefreshAllowed(): boolean {
    return this._state === LoadState.ready || this._state === LoadState.error;
  }

  public get isPullToRefreshing() {
    return this._state === LoadState.pullToRefreshing;
  }

  /* loadingMore */

  public setLoadingMore() {
    this._setState(LoadState.loadingMore);

    return this;
  }

  public get isLoadingMoreAllowed(): boolean {
    const isEndReached = this._lastDataLength < this._pageSize;

    return (
      (this._state === LoadState.ready || this._state === LoadState.error) &&
      !isEndReached
    );
  }

  public get isLoadingMore() {
    return this._state === LoadState.loadingMore;
  }

  /* Ready */

  public get isReady() {
    return this._state === LoadState.ready;
  }

  public get isError() {
    return this._state === LoadState.error;
  }

  public get isEmptyWithError() {
    return this.isError && this.isEmpty;
  }

  public get isEmpty() {
    return !this.data.length;
  }

  private _setState(state: LoadState) {
    this._state = state;
  }

  public performChangeVisibleRange = (index: number, count: number): void => {
    this._visibleRange.index = index;
    this._visibleRange.count = count;
  };
}
