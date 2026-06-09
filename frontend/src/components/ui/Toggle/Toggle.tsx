"use client";

import styles from "./Toggle.module.less";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className={styles.wrapper} onClick={() => onChange(!checked)}>
      <div className={`${styles.track} ${checked ? styles.active : ""}`}>
        <div className={styles.thumb} />
      </div>
      <div className={styles.labelGroup}>
        <span className={styles.label}>{label}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </div>
  );
}
