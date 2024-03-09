import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import HeroSub from '../components/heroSub';
import DonateSection from '@/components/donateSection';
import { Route } from '../lib/types';

export default function Donate() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.DONATE), []);
  const title = 'Support and Donate';
  const desc =
    'Your kind donation will be sincerely appreciated and will go a long way.';

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <DonateSection />
    </>
  );
}
