import { NextSeo } from 'next-seo';
import UnsubscribeSection from '../components/unsubscribeSection';

export default function Unsubscribe() {
  return (
    <>
      <NextSeo noindex />
      <UnsubscribeSection />
    </>
  );
}
