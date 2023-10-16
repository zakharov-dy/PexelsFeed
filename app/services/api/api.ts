import {create} from 'apisauce';
import {getGeneralApiProblem} from './apiProblem';
import type {
  IPhotoListRequest,
  IPhotoList,
  IPhotoListResponse,
} from './photos.api.types';
import type {ApiResponse, ApisauceInstance} from 'apisauce';
import type {IApiConfig} from './api.types';

export interface IApi {
  getPhotoList(req: IPhotoListRequest): Promise<IPhotoListResponse>;
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api implements IApi {
  public apisauce: ApisauceInstance;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  public constructor(config: IApiConfig) {
    this.apisauce = create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: {
        Accept: 'application/json',
        Authorization: config.apiKey,
      },
    });
  }

  public async getPhotoList(
    req: IPhotoListRequest,
  ): Promise<IPhotoListResponse> {
    const response: ApiResponse<IPhotoList> = await this.apisauce.get(
      '/v1/curated',
      req,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return {kind: 'ok', data: response.data};
  }
}
