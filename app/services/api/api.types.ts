import type {GeneralApiProblem} from '_services/api/apiProblem';

export interface IApiConfig {
  url: string;
  timeout: number;
  apiKey: string;
}

export type IApiResponse<T> = {kind: 'ok'; data: T} | GeneralApiProblem;
