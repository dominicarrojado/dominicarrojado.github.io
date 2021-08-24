import Link from 'next/link';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import AnchorLink from './anchorLink';
import TextArrowLink from './textArrowLink';
import { ExternalUrl, Route } from '../lib/types';

function AboutHomeSection() {
  return (
    <Section id="about" className="bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <SectionContent>
          I'm Dominic Arrojado and my passion is turning design into code. I'm a
          web developer specializing in both front-end &amp; back-end
          development. I'm experienced in developing small to large web
          applications.
        </SectionContent>
        <SectionContent>
          I'm currently based in Singapore and working at{' '}
          <AnchorLink href={ExternalUrl.PROPERTY_GURU_FINANCE} isExternal>
            PropertyGuru Finance
          </AnchorLink>{' '}
          as a Senior Software Engineer.
        </SectionContent>
        <SectionContent>
          I write{' '}
          <Link href={Route.POSTS}>
            <a>tech blogs</a>
          </Link>{' '}
          and create{' '}
          <AnchorLink href={ExternalUrl.YOUTUBE} isExternal>
            videos
          </AnchorLink>{' '}
          to share my knowledge and learnings in my web development experiences.
          I hope it will benefit and help some of you folks out here.
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
