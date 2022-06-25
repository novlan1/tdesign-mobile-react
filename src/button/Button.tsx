import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { LoadingIcon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdButtonProps } from './type';
import noop from '../_util/noop';

export interface ButtonProps extends TdButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    className = '',
    block = false,
    children,
    content = '',
    disabled = false,
    ghost = false,
    icon = null,
    loading = false,
    shape = 'square',
    size = 'medium',
    theme = 'default',
    type = 'button',
    variant = 'base',
    onClick = noop,
  } = props;
  const { classPrefix } = useConfig();

  return (
    <button
      ref={ref}
      type={type}
      className={classnames(
        [`${classPrefix}-button`, `${classPrefix}-button--${variant}`, `${classPrefix}-button--${theme}`, className],
        {
          [`${classPrefix}-button--ghost`]: ghost,
          [`${classPrefix}-size-s`]: size === 'small',
          [`${classPrefix}-size-default`]: size === 'medium',
          [`${classPrefix}-size-l`]: size === 'large',
          [`${classPrefix}-is-loading`]: loading,
          [`${classPrefix}-is-disabled`]: disabled,
          [`${classPrefix}-is-block`]: block,
        },
        [`${classPrefix}-button--shape-${shape}`],
      )}
      onClick={!loading && !disabled ? onClick : undefined}
      disabled={disabled || loading}
    >
      {loading ? <LoadingIcon /> : icon}
      { content || children ? <span className={`${classPrefix}-button__text`}> {content || children }</span>: ''}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
