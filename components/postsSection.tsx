import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import Section from './section';
import PostItem from './postItem';
import PostsPagination from './postsPagination';
import AdUnit from './adUnit';
import { GoogleAdSenseUnit, GoogleAdSenseUnitFormat, Post } from '../lib/types';

export type Props = {
  currentPage: number;
  lastPage: number;
  posts: Array<Post>;
};

export default function PostsSection({ posts, currentPage, lastPage }: Props) {
  const shouldDisplay = useMounted();
  const commonTransitionClass = cn(
    'transform transition-opacity duration-700',
    'motion-reduce:transition-none',
    {
      'opacity-0': !shouldDisplay,
    }
  );

  return (
    <Section id="posts">
      <AdUnit
        adSlot={GoogleAdSenseUnit.POSTS_HEADER}
        adFormat={GoogleAdSenseUnitFormat.AUTO}
        className={cn(
          'max-w-screen-3xl -mt-8 mx-auto pb-8',
          'motion-reduce:transition-none',
          'sm:-mt-10 sm:pb-10',
          'md:-mt-12 md:pb-12',
          'lg:w-5/6',
          commonTransitionClass
        )}
      />
      <ul
        className="relative flex flex-col max-w-screen-3xl mx-auto"
        data-testid="posts-list"
      >
        {posts.map((post, idx) => (
          <PostItem
            key={idx}
            post={post}
            headingLevel={2}
            className={commonTransitionClass}
            style={{
              transitionDelay: `${idx * 150}ms`,
            }}
            anchorClassName="bg-gray-100 dark:bg-gray-750"
          />
        ))}
      </ul>
      <PostsPagination currentPage={currentPage} lastPage={lastPage} />
      <AdUnit
        adSlot={GoogleAdSenseUnit.POSTS_FOOTER}
        adFormat={GoogleAdSenseUnitFormat.AUTO}
        className={cn(
          'max-w-screen-3xl -mb-8 mx-auto pt-8',
          'motion-reduce:transition-none',
          'sm:-mb-10 sm:pt-10',
          'md:-mb-12 md:pt-12',
          'lg:w-5/6',
          commonTransitionClass
        )}
      />
    </Section>
  );
}
