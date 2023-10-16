import {StyleSheet} from 'react-native';
import {EColor, ESpace} from '_theme';

export const styles = StyleSheet.create({
  container: {
    borderRadius: ESpace.s16,
    overflow: 'hidden',
  },
  shadowContainer: {
    elevation: ESpace.s16,
    marginBottom: ESpace.s24,
    shadowColor: EColor.dark,
    shadowOffset: {width: ESpace.s8, height: ESpace.s16},
    shadowOpacity: 1,
    shadowRadius: ESpace.s16,
  },
});
