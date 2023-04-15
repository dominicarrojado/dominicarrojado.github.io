import { getFormattedDate } from '../lib/date';

export default function DateText({
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
