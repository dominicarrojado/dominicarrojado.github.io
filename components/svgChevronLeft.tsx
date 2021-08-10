import React, { SVGProps } from 'react';

function SvgChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      />
    </svg>
  );
}

export default SvgChevronLeft;
