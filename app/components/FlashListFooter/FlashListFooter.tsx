import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {ESpace} from '_theme';
import {RoundLoadingAnimation} from '../LoadingAnimation';

interface IListFooterProps {
  isLoading?: boolean;
}

export const FlashListFooter: React.FC<IListFooterProps> = observer(
  ({isLoading}) => (
    <View style={style.flashListFooter}>
      {isLoading ? <RoundLoadingAnimation /> : null}
    </View>
  ),
);

const style = StyleSheet.create({
  flashListFooter: {
    alignItems: 'center',
    height: ESpace.s32 * 2,
  },
});
