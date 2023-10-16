import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import type {ViewStyle} from 'react-native';

const GRADIENT_START = {x: 0, y: 0};
const GRADIENT_STOP = {x: 0, y: 1};
const GRADIENT_LOCATIONS = [0, 1];

interface ShaderProps {
  position?: 'top' | 'bottom';
  height?: number;
  width?: number | string;
  style?: ViewStyle;
  startOpacity?: number;
}

export const Shader = React.memo(
  ({
    position = 'top',
    height = 120,
    width = '100%',
    style,
    startOpacity = 0.7,
  }: ShaderProps) => {
    const isOnTop = position === 'top';

    const gradientStyle = useMemo(
      () => [
        isOnTop ? styles.upperGradient : styles.bottomGradient,
        {height, width},
        style,
      ],
      [style, isOnTop, height, width],
    );

    const gradientColors = useMemo(
      () => [`rgba(0,0,0,${startOpacity})`, 'rgba(0, 0, 0, 0)'],
      [startOpacity],
    );

    return (
      <LinearGradient
        colors={gradientColors}
        locations={GRADIENT_LOCATIONS}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style={gradientStyle}
        start={isOnTop ? GRADIENT_START : GRADIENT_STOP}
        end={isOnTop ? GRADIENT_STOP : GRADIENT_START}
      />
    );
  },
);

const styles = StyleSheet.create({
  bottomGradient: {
    bottom: 0,
    position: 'absolute',
    zIndex: 0,
  },
  upperGradient: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
  },
});
