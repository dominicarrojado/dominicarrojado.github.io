import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import SvgLessThan from './svgLessThan';

export type Props = {
  isLeft?: boolean;
};

export default function HeroMainLogoPart({ isLeft }: Props) {
  const shouldDisplay = useMounted();

  return (
    <SvgLessThan
      className={cn(
        'absolute top-12 h-14 w-14 text-white',
        'transform transition duration-1250',
        'motion-reduce:transition-none',
        'sm:top-16 sm:h-24 sm:w-24',
        'md:top-20 md:h-32 md:w-32',
        'xl:top-24 xl:h-40 xl:w-40',
        {
          [isLeft
            ? '-left-14 sm:-left-24 md:-left-32 xl:-left-40'
            : '-right-14 rotate-180 sm:-right-24 md:-right-32 xl:-right-40']:
            true,
          [!shouldDisplay ? 'text-opacity-0' : 'text-opacity-30']: true,
          ['translate-x-3']: !shouldDisplay && isLeft,
          ['-translate-x-3']: !shouldDisplay && !isLeft,
        }
      )}
    />
  );
}
