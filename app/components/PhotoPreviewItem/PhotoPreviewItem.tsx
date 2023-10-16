import React from 'react';
import {Pressable, View} from 'react-native';
import Image from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Shader} from '_components';
import {NavigatorParamEnum} from '_navigators';
import {Photographer} from './Photographer';
import {PREVIEW_WIDTH_SIZE} from './PhotoPreviewItem.const';
import type {INavigatorParamType} from '_navigators';
import type {NavigationProp} from '@react-navigation/native';
import type {IPhoto} from '_services';
import {styles} from './PhotoPreviewItem.styles';

type TPhotoPreviewItemProps = {
  item: IPhoto;
};

export const PhotoPreviewItem: React.FC<TPhotoPreviewItemProps> = ({item}) => {
  const height = (PREVIEW_WIDTH_SIZE / item.width) * item.height;
  const shaderHeight = height * 0.2;
  const navigation = useNavigation<NavigationProp<INavigatorParamType>>();
  const onPress = () =>
    navigation.navigate(NavigatorParamEnum.photo, {photo: item});

  return (
    <View style={styles.shadowContainer}>
      <Pressable style={styles.container} onPress={onPress}>
        <Image
          source={{uri: item.src.medium}}
          style={{
            width: PREVIEW_WIDTH_SIZE,
            height,
            backgroundColor: item.avg_color,
          }}
          resizeMode={'contain'}
        />
        <Shader
          height={shaderHeight}
          position={'top'}
          width={PREVIEW_WIDTH_SIZE}
          startOpacity={0.5}
        />
        <Shader
          height={shaderHeight}
          position={'bottom'}
          width={PREVIEW_WIDTH_SIZE}
          startOpacity={0.5}
        />
        <Photographer text={item.photographer} />
      </Pressable>
    </View>
  );
};
