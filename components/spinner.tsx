import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

const Spinner = forwardRef(
  (
    { className, color }: { className?: string; color: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={cn(
        'border-transparent rounded-full',
        'animate-spin',
        className
      )}
      style={{ borderRightColor: color }}
      data-testid="spinner"
    />
  )
);

Spinner.displayName = 'Spinner';

export default Spinner;
