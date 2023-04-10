import React, { forwardRef, ForwardedRef } from 'react';
import { FormInput, FormInputProps } from 'ariakit/form';
import cn from 'classnames';

export type Props = FormInputProps;

const Input = forwardRef(
  ({ className, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => (
    <FormInput
      {...props}
      ref={ref}
      className={cn(
        className,
        'block w-full rounded-none border py-2 px-4 border-gray-300 text-black outline-none placeholder:text-gray-400',
        'transition-colors focus:border-black focus:ring-1 focus:ring-black',
        'motion-reduce:transition-none',
        'disabled:opacity-40',
        'dark:border-gray-400 dark:bg-gray-850 dark:text-white dark:placeholder:text-gray-500',
        'dark:focus:border-white dark:focus:ring-white',
        'sm:py-3'
      )}
    />
  )
);

Input.displayName = 'Input';

export default Input;
