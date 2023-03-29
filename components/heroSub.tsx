import HeroSubTitle from './heroSubTitle';
import HeroBackground from './heroBackground';
import HeroSubDescription from './heroSubDescription';
import HeroSection from './heroSection';

export type Props = {
  title: string;
  description: string;
  isMinHeightFull?: boolean;
};

export default function HeroSub({
  title,
  description,
  isMinHeightFull,
}: Props) {
  return (
    <HeroSection isMinHeightFull={isMinHeightFull}>
      <HeroBackground />
      <HeroSubTitle>{title}</HeroSubTitle>
      <HeroSubDescription>{description}</HeroSubDescription>
    </HeroSection>
  );
}
