import cn from 'classnames';
import Spinner from './spinner';

export default function ProjectItemImageLoader() {
  return (
    <Spinner
      className={cn(
        'absolute inset-0 z-0 m-auto h-7 w-7 border-2',
        'sm:h-9 sm:w-9',
        'md:h-11 md:w-11 md:border-4'
      )}
      color="#999999"
    />
  );
}
