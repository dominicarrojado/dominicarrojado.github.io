import HeroBackground from './heroBackground';
import HeroMainLogo from './heroMainLogo';
import HeroMainTitle from './heroMainTitle';
import HeroSection from './heroSection';
import ScrollDownButton from './scrollDownButton';

export default function HeroMain() {
  return (
    <HeroSection isMinHeightFull>
      <HeroBackground />
      <div className="-mt-16">
        <HeroMainLogo />
        <HeroMainTitle />
      </div>
      <ScrollDownButton />
    </HeroSection>
  );
}
