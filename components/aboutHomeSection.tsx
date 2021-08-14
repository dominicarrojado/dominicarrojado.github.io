import Link from 'next/link';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import AnchorLink from './anchorLink';
import { Route } from '../lib/types';
import { EXTERNAL_LINK_ATTRIBUTES } from '../lib/constants';

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
          <a
            href="https://www.propertyguru.com.sg/mortgage"
            {...EXTERNAL_LINK_ATTRIBUTES}
          >
            PropertyGuru Finance
          </a>{' '}
          as a Senior Software Engineer.
        </SectionContent>
        <div className="mt-12 text-center">
          <Link href={Route.ABOUT} passHref>
            <AnchorLink>Read More</AnchorLink>
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default AboutHomeSection;
