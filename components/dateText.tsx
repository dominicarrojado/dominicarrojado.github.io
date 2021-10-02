import { getFormattedDate } from '../lib/date';

function DateText({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  return (
    <time dateTime={dateString} className={className}>
      {getFormattedDate(dateString)}
    </time>
  );
}

export default DateText;
