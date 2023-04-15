import cn from 'classnames';
import Section from './section';
import AnchorLink from './anchorLink';
import PageContent from './pageContent';
import NextLink from './nextLink';
import { ExternalUrl, Route } from '../lib/types';

export default function AboutSection() {
  return (
    <Section>
      <PageContent>
        <figure className={cn('md:float-left md:mr-16', 'xl:mr-20')}>
          <img
            className="w-72 h-auto mx-auto shadow-3xl aspect-square"
            src="/images/about/my-wife-and-i.jpeg"
            alt="A photo of my wife and I"
            width="1440"
            height="1440"
            draggable="false"
          />
          <figcaption className="text-gray-400 text-center">
            My wife and I.
          </figcaption>
        </figure>
        <p>
          My name is Dominic Arrojado and it is my passion to translate design
          into code with great attention to details and solve complicated
          problems with simple solutions. I'm a web developer specializing in
          both front-end and back-end development. I'm experienced in developing
          small to large web applications.
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
          here in Singapore to be with my girlfriend (now wife!) and further my
          career. I've been here since 2018 and my knowledge and experiences
          have grown exponentially since then. With Singapore being a
          multi-ethnic society and a regional hub, I'm able to work with
          competitive people from different walks of life. This gave me the
          inspiration and challenges I needed that shaped me to who I am today.
        </p>
        <p>
          When I'm not coding, I'm either watching{' '}
          <AnchorLink href={ExternalUrl.NETFLIX} isExternal>
            Netflix
          </AnchorLink>{' '}
          shows with my partner or doing my 2-hour workout. I like to watch
          movies and listen to music. Favorite band?{' '}
          <AnchorLink href={ExternalUrl.IMAGINE_DRAGONS} isExternal>
            Imagine Dragons
          </AnchorLink>
          ! If you'd like to hear the songs I listen to, here's my{' '}
          <AnchorLink href={ExternalUrl.SPOTIFY_PLAYLISTS} isExternal>
            Spotify playlists
          </AnchorLink>
          . I'm also currently learning a new language, nope it's not a
          programming one, it's Chinese and I'm learning it in the{' '}
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
          <NextLink href={Route.POSTS}>
            <a>tech blogs</a>
          </NextLink>{' '}
          and create{' '}
          <AnchorLink href={ExternalUrl.PERSONAL_YOUTUBE} isExternal>
            videos
          </AnchorLink>{' '}
          to share my knowledge and learnings in my web development experiences.
          I guess it's just part of being a developer that when you gain much
          experience, you eventually want to share it. That's how our community
          will keep growing. Let's see where this goes and hopefully it will
          benefit and help some of you folks out here!
        </p>
        <p>That's all for now. Thank you for your time ~</p>
      </PageContent>
    </Section>
  );
}
