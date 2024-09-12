import cn from 'classnames';
import HeaderSocialItem from './headerSocialItem';
import { SOCIAL_LINKS } from '../lib/constants';

export type Props = { shouldDisplay: boolean };

export default function HeaderSocialItems({ shouldDisplay }: Props) {
  return (
    <ul
      className={cn(
        'flex -translate-x-7 transform flex-wrap',
        'sm:-translate-x-5',
        'md:-translate-x-6'
      )}
    >
      {SOCIAL_LINKS.map((social, idx) => (
        <HeaderSocialItem
          key={idx}
          idx={idx}
          social={social}
          shouldDisplay={shouldDisplay}
        />
      ))}
    </ul>
  );
}
