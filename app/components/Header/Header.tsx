import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from './ChevronLeftIcon';
import {makeUniformInsets} from '_utils/makeUniformInsets';
import {ESpace} from '_theme';
import {useMarginTopInsets} from '_hooks/useMarginTopInsets.hook';
import type {INavigatorParamType} from '_navigators';
import type {IHeaderProps} from './Header.types';
import type {NavigationProp as INavigationProp} from '@react-navigation/native';
import {styles} from './Header.styles';

export const Header: React.FC<IHeaderProps> = memo(({onBackButtonPress}) => {
  const navigation = useNavigation<INavigationProp<INavigatorParamType>>();
  const marginTop = useMarginTopInsets();

  const onBackPress = () => {
    if (typeof onBackButtonPress === 'function') {
      onBackButtonPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={[marginTop, styles.headerRow, styles.positionSecondary]}>
        <View style={styles.headerControlContainer}>
          <TouchableOpacity
            onPress={onBackPress}
            hitSlop={makeUniformInsets(ESpace.s16)}>
            <ChevronLeftIcon />
          </TouchableOpacity>
        </View>
        {/* TODO: center, right */}
        <View style={styles.headerControlContainer} />
        <View style={styles.headerControlContainer} />
      </View>
    </>
  );
});
