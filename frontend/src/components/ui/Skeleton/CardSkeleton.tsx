'use client';

import { Skeleton } from './Skeleton';
import styles from './Skeleton.module.less';

export function CardSkeleton() {
  return (
    <div className={styles.skeleton} style={{
      background: 'white', borderRadius: 12, border: '1px solid #e5e7eb',
      padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <Skeleton width={48} height={48} borderRadius={12} />
      <Skeleton height={20} width="70%" />
      <Skeleton height={14} width="100%" />
      <Skeleton height={14} width="50%" />
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton width={80} height={24} borderRadius={999} />
        <Skeleton width={100} height={24} borderRadius={999} />
      </div>
    </div>
  );
}
