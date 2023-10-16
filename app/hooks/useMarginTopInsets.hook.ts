import {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useMarginTopInsets = () => {
  const insets = useSafeAreaInsets();
  return useMemo(() => ({marginTop: insets.top || 15}), [insets.top]);
};
