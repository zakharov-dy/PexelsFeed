import React from 'react';
import {View, Text} from 'react-native';
import {human} from 'react-native-typography';
import styles from './Photographer.styles';

type TGuidesProps = {
  text: string;
};

export const Photographer: React.FC<TGuidesProps> = ({text}) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={human.body}>{text}</Text>
    </View>
  </View>
);
