import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';

export default function HeroBackground() {
  const shouldDisplay = useMounted();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-repeat bg-center invert-[.1]',
        'dark:invert-0',
        'motion-safe:animate-slide transition-opacity duration-1250',
        'motion-reduce:transition-none',
        {
          ['opacity-0']: !shouldDisplay,
        }
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
    />
  );
}
