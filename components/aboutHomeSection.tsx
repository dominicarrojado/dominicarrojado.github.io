import Link from 'next/link';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import AnchorLink from './anchorLink';
import TextArrowLink from './textArrowLink';
import { ExternalUrl, Route } from '../lib/types';

function AboutHomeSection() {
  return (
    <Section id="about" className="bg-gray-100 dark:bg-gray-750">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <SectionContent>
          My name is Dominic Arrojado. I write{' '}
          <Link href={Route.POSTS}>
            <a>tech blogs</a>
          </Link>{' '}
          and create{' '}
          <AnchorLink href={ExternalUrl.PERSONAL_YOUTUBE} isExternal>
            videos
          </AnchorLink>{' '}
          to share my knowledge and learnings in my web development experiences.
          It is my passion to translate design into code with great attention to
          details and solve complicated problems with simple solutions.
        </SectionContent>
        <SectionContent>
          I'm currently based in Singapore and working at{' '}
          <AnchorLink href={ExternalUrl.PROPERTY_GURU_FINANCE} isExternal>
            PropertyGuru Finance
          </AnchorLink>{' '}
          as a Senior Software Engineer.
        </SectionContent>
        <div className="mt-12 text-center">
          <Link href={Route.ABOUT} passHref>
            <TextArrowLink>Read More</TextArrowLink>
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default AboutHomeSection;
