import { parseISO, format } from 'date-fns';
import { HTMLProps } from 'react';

function Date({
  dateString,
  ...props
}: { dateString: string } & HTMLProps<HTMLTimeElement>) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} {...props}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
}

export default Date;
