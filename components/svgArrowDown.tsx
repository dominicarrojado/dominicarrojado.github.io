import { SVGProps } from 'react';

function SvgArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20 12l-1.4-1.4-5.6 5.58V4h-2v12.17l-5.58-5.6L4 12l8 8 8-8z" />
    </svg>
  );
}

export default SvgArrowDown;
