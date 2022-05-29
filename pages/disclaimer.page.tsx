import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import HeroSub from '../components/heroSub';
import DisclaimerSection from '../components/disclaimerSection';
import { Route } from '../lib/types';

function Disclaimer() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.DISCLAIMER), []);
  const title = 'Disclaimer';
  const desc =
    'Statements to specify or delimit the scope of rights and obligations';

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <DisclaimerSection />
    </>
  );
}

export default Disclaimer;
