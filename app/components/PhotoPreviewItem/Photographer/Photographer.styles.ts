import {StyleSheet} from 'react-native';
import {EColor, ESpace} from '_theme';

export default StyleSheet.create({
  container: {
    bottom: ESpace.s16,
    position: 'absolute',
    right: ESpace.s20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: EColor.light50,
    borderRadius: ESpace.s8,
    margin: ESpace.s10,
    width: '100%',
  },
});
