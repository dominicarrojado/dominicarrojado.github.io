import cn from 'classnames';
import TextArrowLink from './textArrowLink';
import AnchorLink from './anchorLink';
import NextLink from './nextLink';
import PostLink from './postLink';
import { ExternalUrl, Post, Route } from '../lib/types';

export type Props = {
  previousPost: Post | null;
  nextPost: Post | null;
};

export default function PostFooter({ previousPost, nextPost }: Props) {
  return (
    <div className={cn('w-11/12 max-w-screen-3xl mx-auto', 'lg:w-5/6')}>
      <p className="mt-16 text-gray-400">
        Found an issue with this post?{' '}
        <AnchorLink
          href={ExternalUrl.PERSONAL_GITHUB_WEBSITE_ISSUES}
          isExternal
        >
          Report it here
        </AnchorLink>
        .
      </p>
      <div className="mt-24 flex justify-between items-center">
        {previousPost && (
          <PostLink
            href={`${Route.POSTS}/${previousPost.id}`}
            title={previousPost.title}
            isPrevious
          />
        )}
        <div />
        {nextPost && (
          <PostLink
            href={`${Route.POSTS}/${nextPost.id}`}
            title={nextPost.title}
          />
        )}
      </div>
      <div className="mt-16 text-center">
        <NextLink href={Route.POSTS} passHref>
          <TextArrowLink>See Latest Posts</TextArrowLink>
        </NextLink>
      </div>
    </div>
  );
}
