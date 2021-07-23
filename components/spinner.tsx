import cn from 'classnames';
import { HTMLProps } from 'react';

function Spinner({
  color,
  className,
}: HTMLProps<HTMLDivElement> & { color: string; className: string }) {
  return (
    <div
      className={cn(
        'border-transparent rounded-full',
        'animate-spin',
        className
      )}
      style={{ borderRightColor: color }}
      data-testid="spinner"
    />
  );
}

export default Spinner;
