import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';

export default function HeroBackground() {
  const shouldDisplay = useMounted();

  return (
    <div
      className={cn(
        'absolute left-0 top-0 h-full w-full bg-center bg-repeat invert-[.1]',
        'dark:invert-0',
        'transition-opacity duration-1250 motion-safe:animate-slide',
        'motion-reduce:transition-none',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
    />
  );
}
