import React from 'react';
import {ImageBackground} from 'react-native';
import type {ReactNode} from 'react';
import {styles} from './AppImageBackground.styles';

interface IAppImageBackgroundProps {
  children?: ReactNode;
}

export const AppImageBackground: React.FC<IAppImageBackgroundProps> = ({
  children,
}) => (
  <ImageBackground
    source={require('./background_image.jpg')}
    style={styles.background}>
    {children}
  </ImageBackground>
);
