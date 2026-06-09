"use client";

import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import styles from "./Select.module.less";
import classNames from "classnames";

interface SelectProps extends AntSelectProps {
  label?: string;
  error?: string;
}

export const Select = ({
  label,
  error,
  className = "",
  id,
  ...props
}: SelectProps): React.ReactElement => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <AntSelect
        id={selectId}
        className={classNames(className, styles.select, {
          [styles.hasError]: error,
        })}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

Select.displayName = "Select";
