import React, { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type SkeletonProps = PropsWithChildren<{
  children: React.ReactNode;
  isLoading: boolean;
  style?: StyleProp<ViewStyle | TextStyle>;
}>;
