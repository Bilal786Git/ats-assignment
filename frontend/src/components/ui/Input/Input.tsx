"use client";

import { Input as AntInput, InputProps as AntInputProps } from "antd";
import styles from "./Input.module.less";
import classNames from "classnames";

interface InputProps extends AntInputProps {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps): React.ReactElement => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <AntInput
        id={inputId}
        className={classNames(className, styles.input, {
          [styles.hasError]: error,
        })}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

Input.displayName = "Input";
