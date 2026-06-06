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
    <div className={styles.wrapper}>
      <div className={`${styles.track} ${checked ? styles.active : ""}`}>
        <input
          type="checkbox"
          className={styles.thumb}
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <span className={styles.label}>{label}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </div>
  );
}
