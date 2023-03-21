import { NextSeo } from 'next-seo';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import { Route } from '../lib/types';
import UnsubscribeSection from '../components/unsubscribeSection';
import { useMemo } from 'react';

export default function Unsubscribe() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.UNSUBSCRIBE), []);
  const title = 'Unsubscribe';
  const desc =
    "Unsubscribe from my tech blog and stop receiving email updates on new posts. Simply submit your email address and you'll be removed from the mailing list. Stay up-to-date with the latest tech blog posts on your own terms.";

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <UnsubscribeSection />
    </>
  );
}
