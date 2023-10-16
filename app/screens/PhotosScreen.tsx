import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {human} from 'react-native-typography';
import {inject} from '_DI';
import {List} from '_components';
import {useMarginTopInsets} from '_hooks/useMarginTopInsets.hook';
import {ESpace} from '_theme';
import {
  PREVIEW_ITEM_SIZE_MARGIN,
  PREVIEW_WIDTH_SIZE,
} from '_components/PhotoPreviewItem';
import {PhotoPreviewItem} from '_components/PhotoPreviewItem/PhotoPreviewItem';
import type {ListRenderItem} from '@shopify/flash-list/src/FlashListProps';
import type {NavigatorParamEnum, INavigatorParamType} from '_navigators';
import type {IPhoto} from '_services';
import type {StackScreenProps} from '@react-navigation/stack';
import type {FC} from 'react';

const keyExtractor = ({id}) => id;

const renderItem: ListRenderItem<IPhoto> = ({item}) => (
  <PhotoPreviewItem item={item} />
);

export const PhotosScreen: FC<
  StackScreenProps<INavigatorParamType, NavigatorParamEnum.photos>
> = observer(() => {
  const {photosModel} = inject();
  const marginTop = useMarginTopInsets();

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <Text style={[marginTop, human.title1]}>{'Curated Photos'}</Text>
        <Text style={[styles.subtitle, human.title3]}>
          {photosModel.identifiers.isEmptyWithError
            ? 'There is no data, you may not have added the API key'
            : `Total results: ${photosModel.totalResults}`}
        </Text>
      </>
    ),
    [
      marginTop,
      photosModel.identifiers.isEmptyWithError,
      photosModel.totalResults,
    ],
  );

  return (
    <List<IPhoto>
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      listHeaderComponent={ListHeaderComponent}
      collection={photosModel}
      estimatedItemSize={PREVIEW_WIDTH_SIZE}
      contentContainerStyle={styles.content}
    />
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PREVIEW_ITEM_SIZE_MARGIN,
  },
  subtitle: {
    marginVertical: ESpace.s8,
  },
});
