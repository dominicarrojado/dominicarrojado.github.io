import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import HeroSub from '../components/heroSub';
import PrivacyPolicySection from '../components/privacyPolicySection';
import { Route } from '../lib/types';

function PrivacyPolicy() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.PRIVACY_POLICY), []);
  const title = 'Privacy Policy';
  const desc = 'Find what you need to know about your privacy';

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <PrivacyPolicySection />
    </>
  );
}

export default PrivacyPolicy;
