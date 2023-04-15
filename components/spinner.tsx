import cn from 'classnames';

type Props = { className?: string; color: string };

export default function Spinner({ className, color }: Props) {
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
