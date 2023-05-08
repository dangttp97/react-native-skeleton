import { SkeletonProps } from './SkeletonProps';

export type HOCProps = Omit<SkeletonProps, 'children' | 'style'>;
