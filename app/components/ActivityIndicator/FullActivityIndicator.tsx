import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RoundLoadingAnimation} from '../LoadingAnimation';
import type {StyleProp, ViewStyle} from 'react-native';

type IFullActivityIndicatorProps = {
  style?: StyleProp<ViewStyle>;
};

export const FullActivityIndicator: React.FC<IFullActivityIndicatorProps> = ({
  style,
}) => (
  <View style={styles.container}>
    <RoundLoadingAnimation />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
