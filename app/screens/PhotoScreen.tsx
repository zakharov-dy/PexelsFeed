import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import {VIEWPORT_HEIGHT, VIEWPORT_WIDTH} from '_theme';
import {Header, Shader} from '_components';
import type {NavigatorParamEnum, INavigatorParamType} from '_navigators';
import type {StackScreenProps} from '@react-navigation/stack';
import type {FC} from 'react';

export const PhotoScreen: FC<
  StackScreenProps<INavigatorParamType, NavigatorParamEnum.photo>
> = ({route}) => {
  const {photo} = route.params;
  const height = (VIEWPORT_WIDTH / photo.width) * photo.height;
  const shaderHeight = VIEWPORT_HEIGHT - height / 2;
  return (
    <ImageBackground
      source={{uri: photo.src.medium}}
      blurRadius={10}
      style={styles.content}>
      <Shader
        height={shaderHeight}
        position={'top'}
        width={VIEWPORT_WIDTH}
        startOpacity={0.3}
      />
      <Header />
      <Image
        source={{uri: photo.src.original}}
        style={{
          width: VIEWPORT_WIDTH,
          height,
        }}
        resizeMode={'contain'}
      />
      <Shader
        height={shaderHeight}
        position={'bottom'}
        width={VIEWPORT_WIDTH}
        startOpacity={0.3}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
