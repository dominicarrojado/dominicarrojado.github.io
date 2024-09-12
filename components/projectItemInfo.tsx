import cn from 'classnames';
import ProjectItemHighlight from './projectItemHighlight';
import ProjectItemLink from './projectItemLink';
import { ProjectLink } from '../lib/types';

export type Props = {
  headingLevel: 2 | 3;
  title: string;
  description: string;
  links: Array<ProjectLink>;
  isBest?: boolean;
};

export default function ProjectItemInfo({
  headingLevel,
  title,
  description,
  links,
  isBest,
}: Props) {
  const titleClassName = cn(
    'inline-flex items-center font-bold text-lg',
    'sm:text-xl',
    'md:text-2xl',
    'xl:text-3xl'
  );

  return (
    <div
      className={cn(
        'mt-8 w-full text-center',
        'md:mt-10',
        'lg:mt-0 lg:w-2/6 lg:pl-10 lg:text-left',
        'xl:px-14'
      )}
    >
      {headingLevel === 2 ? (
        <h2 className={titleClassName}>{title}</h2>
      ) : (
        <h3 className={titleClassName}>{title}</h3>
      )}
      {isBest && <ProjectItemHighlight />}
      <p className={cn('mt-1', 'md:mt-4')}>{description}</p>
      <div className={cn('mt-6', 'md:mt-8')}>
        <ul>
          {links.map((link, idx) => (
            <ProjectItemLink key={idx} {...link} projectTitle={title} />
          ))}
        </ul>
      </div>
    </div>
  );
}
