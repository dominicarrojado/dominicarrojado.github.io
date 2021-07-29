import Link from 'next/link';
import Section from './section';
import SectionContent from './sectionContent';
import SectionTitle from './sectionTitle';
import AnchorLink from './anchorLink';
import { Route } from '../lib/types';

function BlogSection() {
  return (
    <Section id="blog" className="bg-gray-100">
      <SectionTitle>Blog</SectionTitle>
      <SectionContent>
        A place to share my knowledge and learnings from my web development
        experiences.
      </SectionContent>
      <div className="mt-12 text-center">
        <Link href={Route.POSTS} passHref>
          <AnchorLink>See All Blog</AnchorLink>
        </Link>
      </div>
    </Section>
  );
}

export default BlogSection;
