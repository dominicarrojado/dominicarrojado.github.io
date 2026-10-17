import cn from 'classnames';

export default function HeroBackground() {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 h-full w-full bg-center bg-repeat invert-[.1]',
        'dark:invert-0',
        'motion-safe:animate-hero-background'
      )}
      style={{ backgroundImage: "url('/images/bg/pattern.png')" }}
    />
  );
}
