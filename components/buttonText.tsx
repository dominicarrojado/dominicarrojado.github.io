import cn from 'classnames';
import React, { ReactNode } from 'react';
import styles from './buttonText.module.css';

function ButtonText({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <button className={cn(styles.btnText, className)}>{children}</button>;
}

export default ButtonText;
