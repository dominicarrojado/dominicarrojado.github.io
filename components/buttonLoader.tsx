import React from 'react';
import cn from 'classnames';
import SvgLoader from './svgLoader';

export default function ButtonLoader() {
  return (
    <SvgLoader
      className={cn(
        '-ml-1 mr-3 h-3.5 w-3.5 animate-spin text-white',
        'dark:text-black',
        'sm:h-4 sm:w-4',
        'xl:h-5 xl:w-5'
      )}
      aria-label="Loading"
    />
  );
}
