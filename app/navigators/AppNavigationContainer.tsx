import React from 'react';
import {useColorScheme} from 'react-native';
import {observer} from 'mobx-react-lite';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {AppStack} from '_navigators/app-navigator';
import {AppImageBackground} from '_components';

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigationContainer = observer((props: NavigationProps) => {
  const colorScheme = useColorScheme();
  const {onStateChange, ...otherProps} = props;

  return (
    <AppImageBackground>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        {...otherProps}>
        <AppStack />
      </NavigationContainer>
    </AppImageBackground>
  );
});

AppNavigationContainer.displayName = 'AppNavigationContainer';
