import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SkeletonFlatListProps } from '../types';
import { SkeletonItem } from '../SkeletonItem';

export const SkeletonFlatList = <T,>({
  ...props
}: SkeletonFlatListProps<T>) => {
  const {
    isLoading,
    renderItem: flatListRenderItem,
    data,
    numberOfDummy = 1,
    ...rest
  } = props;

  const dummyData: T[] = Array(numberOfDummy).fill({});

  const renderItem = (info: ListRenderItemInfo<T>) => {
    const children = flatListRenderItem(info);
    return (
      <>
        {React.Children.map(children, (child, index) => {
          return (
            <SkeletonItem
              key={index}
              isLoading={isLoading}
              style={child?.props.style}
            >
              {child}
            </SkeletonItem>
          );
        })}
      </>
    );
  };

  return (
    <FlatList
      data={isLoading ? dummyData : data}
      renderItem={renderItem}
      {...rest}
    />
  );
};
