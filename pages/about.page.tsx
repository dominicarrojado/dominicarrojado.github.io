import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import HeroSub from '../components/heroSub';
import AboutSection from '../components/aboutSection';
import { Route } from '../lib/types';

export default function About() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.ABOUT), []);
  const title = 'About Me';
  const desc =
    'An introduction of myself - my passion, experiences and interests';

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <AboutSection />
    </>
  );
}
