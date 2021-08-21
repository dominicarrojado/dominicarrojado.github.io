import cn from 'classnames';
import Link from 'next/link';
import { HTMLProps, TransitionEvent, useRef, useState } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useWindowLoaded } from '../lib/custom-hooks';
import SvgChevronLeft from './svgChevronLeft';
import SvgChevronRight from './svgChevronRight';
import Section from './section';
import Date from './date';
import TextArrowLink from './textArrowLink';
import PageContent from './pageContent';
import { Post, PostData, Route } from '../lib/types';

export default function PostContent({ postData }: { postData: PostData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const shouldDisplay = useWindowLoaded();
  const onTransitionEnd = (e: TransitionEvent<HTMLElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };

  return (
    <SwitchTransition>
      <Transition key={postData.id} nodeRef={sectionRef} timeout={0}>
        {(state) => (
          <Section
            ref={sectionRef}
            className={cn('transform transition duration-1000', {
              [animationDone ? 'delay-2500' : 'delay-1500']: true,
              [shouldDisplay && state === 'entered'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10']: true,
            })}
            onTransitionEnd={onTransitionEnd}
            data-testid="section"
          >
            <PostHeader date={postData.date} category={postData.category} />
            <PageContent
              className={cn('mt-8', 'sm:mt-10', 'xl:mt-14')}
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
            <PostFooter
              previousPost={postData.previousPost}
              nextPost={postData.nextPost}
            />
          </Section>
        )}
      </Transition>
    </SwitchTransition>
  );
}

function PostHeader({ date, category }: { date: string; category: string }) {
  return (
    <div
      className={cn(
        'flex justify-between items-center w-11/12 max-w-screen-3xl mx-auto',
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
        Last Updated: <Date dateString={date} />
      </div>
      <div
        className={cn(
          'rounded py-0.5 px-1.5 bg-gray-200 text-2xs capitalize',
          'md:py-1 md:px-2 md:text-xs',
          'xl:text-sm'
        )}
      >
        {category}
      </div>
    </div>
  );
}

function PostFooter({
  previousPost,
  nextPost,
}: {
  previousPost: Post | null;
  nextPost: Post | null;
}) {
  return (
    <div className={cn('w-11/12 max-w-screen-3xl mx-auto', 'lg:w-5/6')}>
      <div className="mt-24 flex justify-between items-center">
        {previousPost && (
          <AdjacentPostLink
            href={`${Route.POSTS}/${previousPost.id}`}
            title={previousPost.title}
            isPrevious
          />
        )}
        <div />
        {nextPost && (
          <AdjacentPostLink
            href={`${Route.POSTS}/${nextPost.id}`}
            title={nextPost.title}
          />
        )}
      </div>
      <div className="mt-16 text-center">
        <Link href={Route.POSTS} passHref>
          <TextArrowLink>See All Blog</TextArrowLink>
        </Link>
      </div>
    </div>
  );
}

function AdjacentPostLink({
  title,
  href,
  isPrevious,
  ...props
}: HTMLProps<HTMLAnchorElement> & {
  href: string;
  title: string;
  isPrevious?: boolean;
}) {
  const Icon = isPrevious ? SvgChevronLeft : SvgChevronRight;

  return (
    <Link href={href} passHref>
      <a
        className={cn('group relative', {
          [isPrevious ? 'pr-2' : 'pl-2']: true,
        })}
        {...props}
      >
        <div className={cn({ 'text-right': !isPrevious })}>
          <div
            className={cn(
              'font-normal',
              'transition-colors duration-300 group-hover:text-black'
            )}
          >
            {title}
          </div>
          <small
            className={cn(
              'text-gray-400',
              'transition-colors duration-300 group-hover:text-black'
            )}
          >
            {isPrevious ? 'Previous Post' : 'Next Post'}
          </small>
        </div>
        <Icon
          className={cn(
            'absolute top-0 bottom-0 m-auto flex-shrink-0 w-3 h-3 ml-1 text-black opacity-30',
            'transform transition duration-300 group-hover:opacity-100',
            'sm:w-4 sm:h-4',
            'xl:w-5 xl:h-5',
            {
              [isPrevious
                ? '-left-6 sm:-left-8 xl:-left-9 group-hover:-translate-x-1.5'
                : '-right-6 sm:-right-8 xl:-right-9 group-hover:translate-x-1.5']:
                true,
            }
          )}
        />
      </a>
    </Link>
  );
}
