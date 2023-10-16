import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {EColor} from '_theme';

export const ChevronLeftIcon = ({color = EColor.light}) => (
  <Svg width={24} height={24} viewBox={'0 0 24 24'} fill={'none'}>
    <Path
      d={'M14 2l-9.293 9.293a1 1 0 000 1.414L14 22'}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  </Svg>
);
