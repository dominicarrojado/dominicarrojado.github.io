import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import Section from './section';
import ProjectItem from './projectItem';
import { PROJECTS } from '../lib/constants';

const PROJECT_SCROLL_BUFFER_MS = 100;

export default function ProjectsSection() {
  const shouldDisplay = useMounted();
  const didScrollToProjectRef = useRef(false);

  useEffect(() => {
    if (!shouldDisplay || didScrollToProjectRef.current) {
      return;
    }

    const projectId = new URLSearchParams(window.location.search)
      .get('project')
      ?.trim();

    if (!projectId) {
      return;
    }

    const targetElement = document.getElementById(projectId);

    if (!targetElement) {
      return;
    }

    didScrollToProjectRef.current = true;
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const scrollDelayMs = isReducedMotion ? 0 : PROJECT_SCROLL_BUFFER_MS;

    const timeoutId = window.setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, scrollDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shouldDisplay]);

  return (
    <Section id="projects">
      <ul className="mx-auto max-w-screen-3xl" data-testid="projects-list">
        {PROJECTS.map((project) => (
          <ProjectItem
            key={project.id}
            id={project.id}
            project={project}
            headingLevel={2}
            className={cn(
              'transform transition-opacity duration-700',
              'motion-reduce:transition-none',
              'scroll-m-8',
              'md:scroll-m-14',
              {
                ['opacity-0']: !shouldDisplay,
              }
            )}
          />
        ))}
      </ul>
    </Section>
  );
}
