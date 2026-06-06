'use client';

import styles from './Skeleton.module.less';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ width = '100%', height = 16, borderRadius }: SkeletonProps) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius: borderRadius || undefined }}
    />
  );
}
