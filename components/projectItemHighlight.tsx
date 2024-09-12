import cn from 'classnames';
import SvgStar from './svgStar';

export default function ProjectItemHighlight() {
  return (
    <div
      className={cn(
        'mt-1 flex select-none items-center justify-center text-xs font-normal uppercase text-yellow-400',
        'md:text-sm',
        'lg:justify-start'
      )}
    >
      <SvgStar
        className={cn(
          '-mt-0.5 mr-1 inline-block h-2.5 w-2.5',
          'md:h-3.5 md:w-3.5'
        )}
      />
      Best Project
    </div>
  );
}
