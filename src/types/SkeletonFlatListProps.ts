import { FlatListProps, ListRenderItemInfo } from 'react-native';
import { SkeletonProps } from './SkeletonProps';

export type SkeletonFlatListProps<T> = FlatListProps<T> &
  Omit<SkeletonProps, 'children' | 'style'> & {
    numberOfDummy?: number;
    renderItem: (info: ListRenderItemInfo<T>) => JSX.Element;
    data: ArrayLike<T>;
  };
