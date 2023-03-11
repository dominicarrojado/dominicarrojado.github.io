import cn from 'classnames';
import { SOCIAL_LINKS } from '../lib/constants';
import HeaderSocialItem from './headerSocialItem';

export default function HeaderSocialItems({
  isMenuOpen,
}: {
  isMenuOpen: boolean;
}) {
  return (
    <ul
      className={cn(
        'flex mt-10 transform -translate-x-4',
        'sm:-translate-x-5',
        'md:-translate-x-6'
      )}
    >
      {SOCIAL_LINKS.map((social, idx) => (
        <HeaderSocialItem
          key={idx}
          idx={idx}
          social={social}
          isMenuOpen={isMenuOpen}
        />
      ))}
    </ul>
  );
}
