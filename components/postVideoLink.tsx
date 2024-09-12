import cn from 'classnames';
import SvgYouTube from './svgYouTube';
import TextArrowLink from './textArrowLink';

export type Props = {
  videoUrl: string;
};

export default function PostVideoLink({ videoUrl }: Props) {
  return (
    <div className={cn('mx-auto mt-4 w-11/12 max-w-screen-3xl', 'lg:w-5/6')}>
      <TextArrowLink href={videoUrl} isExternal>
        <SvgYouTube
          className={cn(
            'mr-2 h-6 w-6 text-gray-400',
            'transition-colors duration-300 group-hover:text-red',
            'motion-reduce:transition-none',
            'dark:group-hover:text-white',
            'sm:mr-3 sm:h-7 sm:w-7',
            'xl:h-8 xl:w-8'
          )}
        />{' '}
        Watch it on YouTube
      </TextArrowLink>
    </div>
  );
}
