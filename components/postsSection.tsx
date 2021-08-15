import { useState } from 'react';
import cn from 'classnames';
import { useWindowLoaded } from '../lib/custom-hooks';
import Section from './section';
import PostItem from './postItem';
import ButtonArrowLink from './buttonArrowLink';
import { Post } from '../lib/types';
import { POSTS_DISPLAY_LATEST_MAX } from '../lib/constants';

function PostsSection({ posts }: { posts: Array<Post> }) {
  const isWindowLoaded = useWindowLoaded();
  const [shouldShowAll, setShouldShowAll] = useState(false);
  const hasMorePosts =
    isWindowLoaded && !shouldShowAll && posts.length > POSTS_DISPLAY_LATEST_MAX;
  const showAllOnClick = () => setShouldShowAll(true);

  return (
    <Section id="posts">
      <ul
        className="relative flex flex-col max-w-screen-3xl mx-auto"
        data-testid="posts-list"
      >
        {posts.map((post, idx) => {
          const isOlder = idx >= POSTS_DISPLAY_LATEST_MAX;
          const shouldDisplay = isWindowLoaded && (shouldShowAll || !isOlder);

          return (
            <PostItem
              key={idx}
              post={post}
              className={cn('transform transition duration-700', {
                'opacity-0 translate-y-10': !shouldDisplay,
              })}
              style={{
                transitionDelay: !isOlder
                  ? `${idx * 150 + 1500}ms`
                  : `${(idx - POSTS_DISPLAY_LATEST_MAX) * 150}ms`,
              }}
              anchorClassName="bg-gray-100"
            />
          );
        })}
      </ul>
      {hasMorePosts && (
        <div
          className={cn(
            'mt-12 text-center',
            'md:mt-16',
            'lg:mt-18',
            'xl:mt-20'
          )}
        >
          <ButtonArrowLink withIcon={false} onClick={showAllOnClick}>
            Show All Posts
          </ButtonArrowLink>
        </div>
      )}
    </Section>
  );
}

export default PostsSection;
