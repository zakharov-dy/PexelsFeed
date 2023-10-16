import {makeLoggable} from 'mobx-log';
import {isObservable} from 'mobx';
import {PhotosModel} from '_models';
import {Api} from '_services';
import type {IApiConfig} from '_services';
import type {IContainer} from './container.types';

export const DEFAULT_API_CONFIG: IApiConfig = {
  url: 'https://api.pexels.com',
  timeout: 10000,
  // TODO: add apiKey here:
  apiKey: 'Ojf...Q4bs',
};

const isThisInstanceIgnoredForLogs = (instance: IContainer[keyof IContainer]) =>
  !isObservable(instance);

export const setupDependencies = (): IContainer => {
  const apiService = new Api(DEFAULT_API_CONFIG);

  const container: IContainer = {
    photosModel: new PhotosModel(apiService, 20),
  };

  if (__DEV__) {
    for (const instance of Object.values(container)) {
      if (!isThisInstanceIgnoredForLogs(instance)) {
        makeLoggable(instance);
      }
    }
  }
  return container;
};
