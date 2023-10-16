import React from 'react';
import {ActivityIndicator} from 'react-native';
import {EColor} from '_theme';

export const RoundLoadingAnimation: React.FC = () => (
  <ActivityIndicator size={24} color={EColor.light} />
);
