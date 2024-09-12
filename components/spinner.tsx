import cn from 'classnames';

type Props = { className?: string; color: string };

export default function Spinner({ className, color }: Props) {
  return (
    <div
      className={cn(
        'rounded-full border-transparent',
        'animate-spin',
        className
      )}
      style={{ borderRightColor: color }}
      data-testid="spinner"
    />
  );
}
