import {makeAutoObservable, runInAction} from 'mobx';
import {CollectionHolder} from '_utils/CollectionHolder';
import type {
  IPhotoListResponse,
  IPhotoListRequest,
  IPhoto,
  IApi,
  IPhotoList,
} from '_services';
import type {IPhotosModel} from './Photos.model.type';

export class PhotosModel implements IPhotosModel {
  private _photosMap: Map<number, IPhoto> = new Map<number, IPhoto>();
  private _pagination?: Omit<IPhotoList, 'photos'> = null;
  public identifiers: CollectionHolder<number> = null;
  public constructor(
    private _api: IApi,
    public pageSize: number,
  ) {
    this.identifiers = new CollectionHolder<number>({pageSize: 20});
    makeAutoObservable(this);
    this._setup();
  }

  public loadMore = () => {
    if (!this._pagination) {
      // TODO can be undefined but it's highlighted as an error
      return Promise.resolve();
    }
    return this._loadMore({
      page: this._pagination.page + 1,
      per_page: this.pageSize,
    });
  };

  public pullToRefresh = () =>
    this._pullToRefresh({
      page: 1,
      per_page: this.pageSize,
    });

  private _makeRequest = (
    req: IPhotoListRequest,
  ): Promise<IPhotoListResponse> => this._api.getPhotoList(req);

  private _setup = () => {
    this.identifiers.setLoading();
    this._load({page: 1, per_page: this.pageSize});
  };

  public get list() {
    // unique items
    return [...new Set(this.identifiers.data)].map(id =>
      this._photosMap.get(id),
    );
  }

  private _load = async (req: IPhotoListRequest) => {
    const res = await this._makeRequest(req);

    if (res.kind === 'ok') {
      res.data.photos.forEach(photo =>
        runInAction(() => this._photosMap.set(photo.id, photo)),
      );
      this.identifiers.setData(res.data.photos.map(photo => photo.id));

      this.setPaginationData(res.data);
    } else {
      this.identifiers.setError({msg: res.kind}, true);
    }
  };

  private _loadMore = async (params: IPhotoListRequest) => {
    if (
      !this._pagination ||
      !this.identifiers.isLoadingMoreAllowed ||
      this.identifiers.isLoadingMore
    ) {
      return;
    }

    this.identifiers.setLoadingMore();
    await this._load(params);
  };

  private _pullToRefresh = async (params: IPhotoListRequest) => {
    this.identifiers.setPullToRefreshing();
    await this._load(params);
  };

  public get isPullToRefresh(): boolean {
    return this.identifiers.isPullToRefreshing;
  }

  public get totalResults() {
    return this._pagination?.total_results;
  }

  public setPaginationData = (res: IPhotoList) => {
    if (!res) {
      this._pagination = undefined;
      return;
    }
    const {photos, ...pagination} = res;
    this._pagination = pagination;
  };
}
