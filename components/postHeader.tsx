import cn from 'classnames';
import DateText from './dateText';

export type Props = {
  date: string;
  category: string;
};

export default function PostHeader({ date, category }: Props) {
  return (
    <div
      className={cn(
        'mx-auto flex w-11/12 max-w-screen-3xl items-center justify-between',
        'lg:w-5/6'
      )}
    >
      <div
        className={cn(
          'mr-4 text-sm text-gray-400',
          'sm:text-base',
          'xl:text-lg'
        )}
      >
        Last Updated: <DateText dateString={date} />
      </div>
      <div
        className={cn(
          'rounded bg-gray-200 px-1.5 py-0.5 text-2xs capitalize',
          'dark:bg-gray-600',
          'md:px-2 md:py-1 md:text-xs',
          'xl:text-sm'
        )}
      >
        {category}
      </div>
    </div>
  );
}
