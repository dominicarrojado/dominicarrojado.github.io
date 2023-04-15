import { NextSeo } from 'next-seo';
import HeroSub from '../components/heroSub';

export default function Custom404() {
  const title = '404 - Page Not Found';

  return (
    <>
      <NextSeo title={title} noindex nofollow />
      <HeroSub
        title={title}
        description="Sorry, we couldn't find what you're looking for. Please check the menu for existing pages."
        isMinHeightFull
      />
    </>
  );
}
