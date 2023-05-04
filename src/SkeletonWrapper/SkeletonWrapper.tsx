import React from 'react';
import { View } from 'react-native';
import { SkeletonItem } from '../SkeletonItem';
import { SkeletonProps } from '../types/SkeletonProps';

export const SkeletonWrapper = ({ ...props }: SkeletonProps) => {
  const { children, style, isLoading } = props;

  const getBones = () => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        const childStyle = child?.props.style || {};
        return (
          <SkeletonItem key={index} isLoading={isLoading} style={childStyle}>
            {child}
          </SkeletonItem>
        );
      }
      return child;
    });
  };

  return <View style={style}>{getBones()}</View>;
};
