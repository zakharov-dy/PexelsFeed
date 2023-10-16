import {StyleSheet} from 'react-native';
import {ESpace} from '_theme';

export const styles = StyleSheet.create({
  headerControlContainer: {
    minHeight: ESpace.s24,
    minWidth: ESpace.s24,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: ESpace.s24,
  },
  positionSecondary: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});
