"use client";
import { Badge as AntBadge } from "antd";
import styles from "./Badge.module.less";
import classNames from "classnames";

interface BadgeProps {
  variant?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const variantClass = styles[variant] || styles.default;
  return (
    <AntBadge className={classNames(styles.badge, variantClass)}>
      {children}
    </AntBadge>
  );
}
