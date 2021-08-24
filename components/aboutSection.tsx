import Link from 'next/link';
import cn from 'classnames';
import Section from './section';
import AnchorLink from './anchorLink';
import { ExternalUrl, Route } from '../lib/types';
import PageContent from './pageContent';

function AboutSection() {
  return (
    <Section>
      <PageContent>
        <p>
          I'm Dominic Arrojado and my passion is turning design into code. I'm a
          web developer specializing in both front-end &amp; back-end
          development. I'm experienced in developing small to large web
          applications.
        </p>
        <p>
          I'm currently based in Singapore and working at{' '}
          <AnchorLink href={ExternalUrl.PROPERTY_GURU_FINANCE} isExternal>
            PropertyGuru Finance
          </AnchorLink>{' '}
          as a Senior Software Engineer.{' '}
          <AnchorLink href={ExternalUrl.PROPERTY_GURU_FINANCE} isExternal>
            PropertyGuru Finance
          </AnchorLink>{' '}
          is a financial technology (<em>fintech</em>) arm within{' '}
          <AnchorLink href={ExternalUrl.PROPERTY_GURU_GROUP} isExternal>
            PropertyGuru Group
          </AnchorLink>{' '}
          - Southeast Asia's pioneering and most trusted property technology
          company.
        </p>
        <p>
          I'm originally from the Philippines and found an opportunity to move
          here in Singapore to be with my girlfriend (now fiancée!) and further
          my career. I've been here since 2018 and my knowledge and experiences
          have grown exponentially since then. With Singapore being a
          multi-ethnic society and a regional hub, I'm able to work with
          competitive people from different walks of life; gave me the
          inspiration and challenges I needed that shaped me to who I am today.
        </p>
        <p>
          When I'm not coding, I'm either watching{' '}
          <AnchorLink href={ExternalUrl.NETFLIX} isExternal>
            Netflix
          </AnchorLink>{' '}
          shows with my partner or doing my 2-hour workout. I have passion for
          watching movies and listening to music. Here's my{' '}
          <AnchorLink href={ExternalUrl.SPOTIFY_PLAYLISTS} isExternal>
            Spotify playlists
          </AnchorLink>{' '}
          if you'd like to find out what I listen to. I'm also currently
          learning a new language, nope it's not programming, it's Chinese and
          I'm learning it in{' '}
          <AnchorLink href={ExternalUrl.DUOLINGO} isExternal>
            Duolingo
          </AnchorLink>{' '}
          app - I highly recommend it because it's a free, fun and effective way
          to learn a language.
        </p>
        <p>
          Being an introvert and a man of few words, I didn't imagine myself to
          be doing this tech blog, but one day I suddenly had the urge to start
          writing{' '}
          <Link href={Route.POSTS}>
            <a>tech blogs</a>
          </Link>{' '}
          and create{' '}
          <AnchorLink href={ExternalUrl.YOUTUBE} isExternal>
            videos
          </AnchorLink>{' '}
          to share my knowledge and learnings in my web development experiences
          - so I'm going to see where this goes and hopefully it will benefit
          and help some of you folks out here!
        </p>
        <p>That's all for me for now. Thanks for reading ~</p>
      </PageContent>
    </Section>
  );
}

export default AboutSection;
