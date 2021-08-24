import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import PrivacyPolicySection from '../components/privacyPolicySection';
import { Route } from '../lib/types';

function PrivacyPolicy() {
  const title = 'Privacy Policy';
  const desc = 'Find what you need to know about your privacy';

  return (
    <>
      <SeoTags path={Route.PRIVACY_POLICY} title={title} description={desc} />
      <HeroSub title={title} description={desc} />
      <PrivacyPolicySection />
    </>
  );
}

export default PrivacyPolicy;
