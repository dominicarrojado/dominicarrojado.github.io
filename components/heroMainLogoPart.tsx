import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import SvgLessThan from './svgLessThan';

export default function HeroMainLogoPart({ isLeft }: { isLeft?: boolean }) {
  const shouldDisplay = useMounted();

  return (
    <SvgLessThan
      className={cn(
        'absolute top-12 w-14 h-14 text-white',
        'transform transition duration-1250 delay-700',
        'motion-reduce:transition-none',
        'sm:top-16 sm:w-24 sm:h-24',
        'md:top-20 md:w-32 md:h-32',
        'xl:top-24 xl:w-40 xl:h-40',
        {
          [isLeft
            ? '-left-14 sm:-left-24 md:-left-32 xl:-left-40'
            : '-right-14 sm:-right-24 md:-right-32 xl:-right-40 rotate-180']:
            true,
          [!shouldDisplay ? 'text-opacity-0' : 'text-opacity-30']: true,
          ['translate-x-3']: !shouldDisplay && isLeft,
          ['-translate-x-3']: !shouldDisplay && !isLeft,
        }
      )}
      data-testid="logo-part"
    />
  );
}
