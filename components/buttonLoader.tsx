import React from 'react';
import cn from 'classnames';
import SvgLoader from './svgLoader';

export default function ButtonLoader() {
  return (
    <SvgLoader
      className={cn(
        'animate-spin -ml-1 mr-3 w-3.5 h-3.5 text-white',
        'dark:text-black',
        'sm:w-4 sm:h-4',
        'xl:w-5 xl:h-5'
      )}
      aria-label="Loading"
    />
  );
}
