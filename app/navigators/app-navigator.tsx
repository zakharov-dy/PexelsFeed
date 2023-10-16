import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorParamEnum} from './app-navigator.const';
import {PhotosScreen} from '_screens';
import {EColor} from '_theme';
import {PhotoScreen} from '_screens/PhotoScreen';
import type {INavigatorParamType} from '_navigators/app-navigator.type';

const Stack = createNativeStackNavigator<INavigatorParamType>();

export const AppStack = observer(() => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={NavigatorParamEnum.photos} component={PhotosScreen} />
    <Stack.Screen name={NavigatorParamEnum.photo} component={PhotoScreen} />
  </Stack.Navigator>
));

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: EColor.transparent,
  },
});

const screenOptions = {
  headerShown: false,
  contentStyle: styles.contentStyle,
};
