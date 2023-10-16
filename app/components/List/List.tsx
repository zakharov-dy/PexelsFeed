import React from 'react';
import {RefreshControl} from 'react-native';
import {observer} from 'mobx-react-lite';
import {FlashList} from '@shopify/flash-list';
import {FlashListFooter, FullActivityIndicator} from '_components';
import {EColor} from '_theme';
import type {FlashListProps} from '@shopify/flash-list';
import type {IPaginationModel} from '_models';

interface IListProps<T> extends Omit<FlashListProps<T>, 'data'> {
  collection?: IPaginationModel<T>;
  listHeaderComponent: React.ReactElement;
}

const RefreshControlColors = [EColor.transparent];

export const List = observer(
  <T,>({listHeaderComponent, collection, ...props}: IListProps<T>) => (
    <FlashList<T>
      data={collection.list}
      scrollEnabled={!collection.isPullToRefresh}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={FullActivityIndicator}
      refreshing={collection.isPullToRefresh}
      refreshControl={
        <RefreshControl
          colors={RefreshControlColors}
          refreshing={collection.isPullToRefresh}
          onRefresh={collection.pullToRefresh}
        />
      }
      onEndReached={collection.loadMore}
      ListFooterComponent={
        <FlashListFooter isLoading={collection.identifiers.isLoadingMore} />
      }
      {...props}
    />
  ),
);
