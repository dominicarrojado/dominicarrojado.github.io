import { HTMLAttributes } from 'react';

function SvgArrowDown(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 12l-1.4-1.4-5.6 5.58V4h-2v12.17l-5.58-5.6L4 12l8 8 8-8z"
      />
    </svg>
  );
}

export default SvgArrowDown;
