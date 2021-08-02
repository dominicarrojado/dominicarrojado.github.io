import Link from 'next/link';
import cn from 'classnames';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import AnchorLink from './anchorLink';
import { Post, Route } from '../lib/types';
import PostItem from './postItem';

function PostsSection({ latestPosts }: { latestPosts: Array<Post> }) {
  return (
    <Section id="posts" className="bg-gray-100">
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
          <PostItem key={idx} post={post} />
        ))}
      </ul>
      <div
        className={cn('mt-12 text-center', 'md:mt-16', 'lg:mt-18', 'xl:mt-20')}
      >
        <Link href={Route.POSTS} passHref>
          <AnchorLink>See All Blog</AnchorLink>
        </Link>
      </div>
    </Section>
  );
}

export default PostsSection;
