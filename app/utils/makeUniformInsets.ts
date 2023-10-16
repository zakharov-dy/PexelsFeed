import {memoize} from 'lodash';
import type {Insets} from 'react-native';

export const makeUniformInsets = memoize(
  (size: number): Insets => ({
    bottom: size,
    top: size,
    left: size,
    right: size,
  }),
);
