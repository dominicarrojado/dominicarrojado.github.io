import { useRef } from 'react';
import cn from 'classnames';
import { trackEvent } from '../lib/google-analytics';
import TextArrowLink from './textArrowLink';
import { GoogleAnalyticsEvent, ProjectLink, Route } from '../lib/types';

export type Props = ProjectLink & { projectTitle: string };

export default function ProjectItemLink({ title, url, projectTitle }: Props) {
  const isClickedRef = useRef(false);
  const isExternal = !url.startsWith(Route.HOME);
  const onClick = () => {
    isClickedRef.current = true;
    trackEvent({
      projectTitle,
      event: GoogleAnalyticsEvent.PROJECT_CLICK,
      linkText: title,
      linkUrl: url,
    });
  };

  return (
    <li className={cn('mt-4', 'sm:mt-2', 'lg:mt-1')}>
      <TextArrowLink
        href={url}
        onClick={onClick}
        target="_blank"
        isExternal={isExternal}
      >
        {title}
      </TextArrowLink>
    </li>
  );
}
