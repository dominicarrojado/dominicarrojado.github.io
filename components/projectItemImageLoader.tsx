import cn from 'classnames';
import Spinner from './spinner';

export default function ProjectItemImageLoader() {
  return (
    <Spinner
      className={cn(
        'absolute inset-0 z-0 w-7 h-7 m-auto border-2',
        'sm:w-9 sm:h-9',
        'md:w-11 md:h-11 md:border-4'
      )}
      color="#999999"
    />
  );
}
