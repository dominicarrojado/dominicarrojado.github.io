import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import DisclaimerSection from '../components/disclaimerSection';
import { Route } from '../lib/types';

function Disclaimer() {
  const title = 'Disclaimer';
  const desc =
    'Statements to specify or delimit the scope of rights and obligations';

  return (
    <>
      <SeoTags path={Route.DISCLAIMER} title={title} description={desc} />
      <HeroSub title={title} description={desc} />
      <DisclaimerSection />
    </>
  );
}

export default Disclaimer;
