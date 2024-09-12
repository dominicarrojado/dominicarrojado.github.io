import cn from 'classnames';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import TextArrowLink from './textArrowLink';
import PostItem from './postItem';
import NextLink from './nextLink';
import { Post, Route } from '../lib/types';

type Props = {
  latestPosts: Array<Post>;
};

export default function PostsHomeSection({ latestPosts }: Props) {
  return (
    <Section id="posts" className="bg-gray-100 dark:bg-gray-750">
      <SectionTitle>Blog</SectionTitle>
      <SectionContent>
        A place to share my knowledge and learnings from my web development
        experiences.
      </SectionContent>
      <ul
        className={cn(
          'mx-auto mt-8 flex max-w-screen-3xl flex-col',
          'sm:mt-10',
          'lg:mt-12'
        )}
      >
        {latestPosts.map((post, idx) => (
          <PostItem
            key={idx}
            post={post}
            headingLevel={3}
            anchorClassName="bg-white dark:bg-gray-650"
          />
        ))}
      </ul>
      <div
        className={cn('mt-12 text-center', 'md:mt-16', 'lg:mt-18', 'xl:mt-20')}
      >
        <NextLink href={`${Route.POSTS_PAGE}/2`} passHref>
          <TextArrowLink>See More Posts</TextArrowLink>
        </NextLink>
      </div>
    </Section>
  );
}
