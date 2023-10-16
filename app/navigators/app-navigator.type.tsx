import type {IPhoto} from '_services';
import type {NavigatorParamEnum} from './app-navigator.const';

export type INavigatorParamType = {
  [NavigatorParamEnum.photo]: {photo: IPhoto};
  [NavigatorParamEnum.photos]: undefined;
};
