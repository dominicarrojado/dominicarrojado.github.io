import Link from 'next/link';
import cn from 'classnames';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import TextArrowLink from './textArrowLink';
import PostItem from './postItem';
import { Post, Route } from '../lib/types';

function PostsHomeSection({ latestPosts }: { latestPosts: Array<Post> }) {
  return (
    <Section id="posts" className="bg-gray-100 dark:bg-gray-750">
      <SectionTitle>Blog</SectionTitle>
      <SectionContent>
        A place to share my knowledge and learnings from my web development
        experiences.
      </SectionContent>
      <ul
        className={cn(
          'flex flex-col max-w-screen-3xl mx-auto mt-8',
          'sm:mt-10',
          'lg:mt-12'
        )}
      >
        {latestPosts.map((post, idx) => (
          <PostItem
            key={idx}
            post={post}
            anchorClassName="bg-white dark:bg-gray-650"
          />
        ))}
      </ul>
      <div
        className={cn('mt-12 text-center', 'md:mt-16', 'lg:mt-18', 'xl:mt-20')}
      >
        <Link href={Route.POSTS} passHref>
          <TextArrowLink>See All Blog</TextArrowLink>
        </Link>
      </div>
    </Section>
  );
}

export default PostsHomeSection;
