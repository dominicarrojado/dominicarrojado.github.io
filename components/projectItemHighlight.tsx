import cn from 'classnames';
import SvgStar from './svgStar';

export default function ProjectItemHighlight() {
  return (
    <div
      className={cn(
        'flex justify-center items-center mt-1 text-xs text-yellow-400 font-normal uppercase select-none',
        'md:text-sm',
        'lg:justify-start'
      )}
    >
      <SvgStar
        className={cn(
          'inline-block w-2.5 h-2.5 mr-1 -mt-0.5',
          'md:w-3.5 md:h-3.5'
        )}
      />
      Best Project
    </div>
  );
}
