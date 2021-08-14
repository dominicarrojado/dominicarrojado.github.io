import cn from 'classnames';
import { useWindowLoaded } from '../lib/custom-hooks';
import Section from './section';
import { EXTERNAL_LINK_ATTRIBUTES } from '../lib/constants';

function AboutSection() {
  const propertyGuruFinanceUrl = 'https://www.propertyguru.com.sg/mortgage';
  const shouldDisplay = useWindowLoaded();

  return (
    <Section>
      <p
        className={cn(
          'w-11/12 max-w-screen-3xl mx-auto',
          'transition duration-700 delay-1500',
          'lg:w-5/6',
          {
            ['transform opacity-0 translate-y-10']: !shouldDisplay,
          }
        )}
        data-testid="about"
      >
        I'm Dominic Arrojado and my passion is turning design into code. I'm a
        web developer specializing in both front-end &amp; back-end development.
        I'm experienced in developing small to large web applications.
        <br />
        <br />
        I'm currently based in Singapore and working at{' '}
        <a href={propertyGuruFinanceUrl} {...EXTERNAL_LINK_ATTRIBUTES}>
          PropertyGuru Finance
        </a>{' '}
        as a Senior Software Engineer.{' '}
        <a href={propertyGuruFinanceUrl} {...EXTERNAL_LINK_ATTRIBUTES}>
          PropertyGuru Finance
        </a>{' '}
        is a financial technology (<em>fintech</em>) arm within{' '}
        <a
          href="https://www.propertygurugroup.com/"
          {...EXTERNAL_LINK_ATTRIBUTES}
        >
          PropertyGuru Group
        </a>{' '}
        - Southeast Asia's pioneering and most trusted property technology
        company.
        <br />
        <br />
        I'm originally from the Philippines and had an opportunity to move here
        in Singapore to be with my girlfriend (now fiancée!) and further my
        career. I've been here since 2018 and my knowledge and experiences have
        grown exponentially since then. With Singapore being a multi-ethnic
        society and a regional hub, I'm able to work with competitive people
        from different walks of life which honed to who I am today.
        <br />
        <br />
        When I'm not coding, I'm either watching Netflix shows with my partner
        or doing my 2-hour workout. I have a love for movies and music. Here's
        my{' '}
        <a
          href="https://open.spotify.com/user/dominicarrojado/playlists"
          {...EXTERNAL_LINK_ATTRIBUTES}
        >
          Spotify playlists
        </a>{' '}
        if you'd like to know what I listen to. I'm also currently learning a
        new language, not programming, but Chinese and I'm learning it in{' '}
        <a href="https://www.duolingo.com/" {...EXTERNAL_LINK_ATTRIBUTES}>
          Duolingo
        </a>{' '}
        app - I highly recommend it because it's a free, fun and effective way
        to learn a language.
        <br />
        <br />
        Being an introvert and a man of few words, I didn't imagine myself to be
        doing this blog, but one day I suddenly got this thought that I should
        start writing tech blogs or video tutorials to share my knowledge and
        experiences in web development - so let's see where this goes and
        hopefully it will benefit and help some of you folks out here!
        <br />
        <br />
        That's all for me for now. Thanks for reading ~
      </p>
    </Section>
  );
}

export default AboutSection;
