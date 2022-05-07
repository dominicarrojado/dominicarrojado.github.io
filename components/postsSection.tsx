import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import Section from './section';
import PostItem from './postItem';
import PostsPagination from './postsPagination';
import { Post } from '../lib/types';

export type Props = {
  currentPage: number;
  lastPage: number;
  posts: Array<Post>;
};

export default function PostsSection({ posts, currentPage, lastPage }: Props) {
  const shouldDisplay = useMounted();

  return (
    <Section id="posts">
      <ul
        className="relative flex flex-col max-w-screen-3xl mx-auto"
        data-testid="posts-list"
      >
        {posts.map((post, idx) => (
          <PostItem
            key={idx}
            post={post}
            headingLevel={2}
            className={cn(
              'transform transition-transform-opacity duration-700',
              'motion-reduce:transition-none',
              {
                'opacity-0 translate-y-10': !shouldDisplay,
              }
            )}
            style={{
              transitionDelay: `${idx * 150 + 1500}ms`,
            }}
            anchorClassName="bg-gray-100 dark:bg-gray-750"
          />
        ))}
      </ul>
      <PostsPagination currentPage={currentPage} lastPage={lastPage} />
    </Section>
  );
}
