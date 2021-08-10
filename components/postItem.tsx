import { CSSProperties } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Date from './date';
import ButtonLink from './buttonLink';
import { Post, Route } from '../lib/types';

function PostItem({
  post,
  className,
  style,
  anchorClassName,
}: {
  post: Post;
  className?: string;
  style?: CSSProperties;
  anchorClassName?: string;
}) {
  return (
    <li
      className={cn(
        'mt-4 first:mt-0 select-none',
        'sm:mt-6',
        'md:mt-8',
        'xl:mt-10',
        className
      )}
      style={style}
    >
      <Link href={`${Route.POSTS}/${post.id}`} passHref>
        <a
          className={cn(
            'group flex w-full shadow-md py-6 px-4',
            'transition-shadow duration-300 hover:shadow-xl',
            'sm:px-6',
            'md:p-8',
            'xl:p-10',
            anchorClassName
          )}
        >
          <article className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <Date
                dateString={post.date}
                className={cn('text-xs', 'md:text-sm')}
              />
              <div
                className={cn(
                  'rounded py-0.5 px-1.5 bg-gray-200 text-2xs capitalize',
                  'md:py-1 md:px-2 md:text-xs',
                  'xl:text-sm'
                )}
              >
                {post.category}
              </div>
            </div>
            <h3
              className={cn(
                'mt-2 font-bold text-lg',
                'sm:text-xl',
                'md:text-2xl',
                'xl:text-3xl'
              )}
            >
              {post.title}
            </h3>
            <p className="mt-4">{post.excerpt}</p>
            <div className="mt-6">
              <ButtonLink>Read More</ButtonLink>
            </div>
          </article>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
