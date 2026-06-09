"use client";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import styles from "./Button.module.less";
import classNames from "classnames";

interface ButtonProps extends AntButtonProps {
  fullWidth?: boolean;
}

export const Button = ({
  children,
  fullWidth,
  disabled,
  className = "",
  loading = false,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    <AntButton
      className={classNames(className, styles.button, {
        [styles.fullWidth]: fullWidth,
      })}
      disabled={!!(disabled || loading)}
      loading={loading}
      {...props}
    >
      {children}
    </AntButton>
  );
};
