'use client';

import styles from './Badge.module.less';

interface BadgeProps {
  variant?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const variantClass = (styles as Record<string, string>)[variant] || styles.default;
  return <span className={`${styles.badge} ${variantClass}`}>{children}</span>;
}
