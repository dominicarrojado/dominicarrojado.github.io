import { CSSProperties } from 'react';
import cn from 'classnames';
import DateText from './dateText';
import ButtonArrowLink from './buttonArrowLink';
import NextLink from './nextLink';
import { Post, Route } from '../lib/types';

export default function PostItem({
  post,
  headingLevel,
  className,
  style,
  anchorClassName,
}: {
  post: Post;
  headingLevel: 2 | 3;
  className?: string;
  style?: CSSProperties;
  anchorClassName?: string;
}) {
  const titleClassName = cn(
    'mt-2 font-bold text-lg',
    'sm:text-xl',
    'md:text-2xl',
    'xl:text-3xl'
  );

  return (
    <li
      className={cn(
        'mt-4 select-none first:mt-0',
        'sm:mt-6',
        'md:mt-8',
        'xl:mt-10',
        className
      )}
      style={style}
    >
      <NextLink href={`${Route.POSTS}/${post.id}`}>
        <a
          className={cn(
            'group flex w-full px-4 py-6 shadow-md',
            'transition-shadow duration-300 hover:shadow-xl',
            'motion-reduce:transition-none',
            'sm:px-6',
            'md:p-8',
            'xl:p-10',
            anchorClassName
          )}
        >
          <article className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <DateText
                dateString={post.date}
                className={cn('text-xs', 'md:text-sm')}
              />
              <div
                className={cn(
                  'rounded bg-gray-200 px-1.5 py-0.5 text-2xs capitalize',
                  'dark:bg-gray-600',
                  'md:px-2 md:py-1 md:text-xs',
                  'xl:text-sm'
                )}
              >
                {post.category}
              </div>
            </div>
            {headingLevel === 2 ? (
              <h2 className={titleClassName}>{post.title}</h2>
            ) : (
              <h3 className={titleClassName}>{post.title}</h3>
            )}
            <p className="mt-4">{post.excerpt}</p>
            <div className="mt-6">
              <ButtonArrowLink as="span">Read Post</ButtonArrowLink>
            </div>
          </article>
        </a>
      </NextLink>
    </li>
  );
}
