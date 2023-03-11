import HeroMainBackground from './heroMainBackground';
import HeroMainLogo from './heroMainLogo';
import HeroMainTitle from './heroMainTitle';
import HeroMainSection from './heroMainSection';
import ScrollDownButton from './scrollDownButton';

export default function HeroMain() {
  return (
    <HeroMainSection>
      <HeroMainBackground />
      <div className="z-10 w-full -mt-16 text-center">
        <HeroMainLogo />
        <HeroMainTitle />
      </div>
      <ScrollDownButton />
    </HeroMainSection>
  );
}
