import React from 'react';
import { SkeletonWrapper } from '../SkeletonWrapper';
import { HOCProps } from '../types';

export function withSkeletonLoading<T>(Component: React.ComponentType<T>) {
  return ({ ...props }: T & HOCProps) => {
    const { isLoading } = props;

    return (
      <SkeletonWrapper isLoading={isLoading}>
        <Component {...props} />
      </SkeletonWrapper>
    );
  };
}
