import { CSSProperties } from 'react';
import cn from 'classnames';
import ProjectItemImage from './projectItemImage';
import ProjectItemInfo from './projectItemInfo';
import { Project } from '../lib/types';

export type Props = {
  project: Project;
  className?: string;
  style?: CSSProperties;
  headingLevel: 2 | 3;
};

export default function ProjectItem({
  project,
  className,
  style,
  headingLevel,
}: Props) {
  return (
    <li
      className={cn(
        'flex flex-col items-center mt-16 first:mt-0',
        'sm:mt-24',
        'lg:mt-48 lg:flex-row',
        'xl:mt-52',
        className
      )}
      style={style}
    >
      <ProjectItemImage
        imageUrl={project.imageUrl}
        imageWidth={project.imageWidth}
        imageHeight={project.imageHeight}
        gifUrl={project.gifUrl}
        title={project.title}
      />
      <ProjectItemInfo
        headingLevel={headingLevel}
        title={project.title}
        description={project.description}
        links={project.links}
        isBest={project.isBest}
      />
    </li>
  );
}
