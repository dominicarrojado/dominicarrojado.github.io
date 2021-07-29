import Link from 'next/link';
import Section from './section';
import SectionContent from './sectionContent';
import SectionTitle from './sectionTitle';
import AnchorLink from './anchorLink';
import { Route } from '../lib/types';

function FeaturedProjectsSection() {
  return (
    <Section id="best-projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <SectionContent>A selection of projects I've done so far.</SectionContent>
      <div className="mt-12 text-center">
        <Link href={Route.PROJECTS} passHref>
          <AnchorLink>See All Projects</AnchorLink>
        </Link>
      </div>
    </Section>
  );
}

export default FeaturedProjectsSection;
