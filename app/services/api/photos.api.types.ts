import type {IApiResponse} from '_services/api/api.types';

export interface IPhotoListRequest {
  page?: number;
  per_page?: number;
}

export type IPhotoListResponse = IApiResponse<IPhotoList>;

export interface IPhotoList {
  page: number;
  per_page: number;
  total_results: number;
  prev_page: string;
  next_page: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ISrc;
  liked: boolean;
  alt: string;
}

export interface ISrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
