import cn from 'classnames';
import SvgYouTube from './svgYouTube';
import TextArrowLink from './textArrowLink';

export type Props = {
  videoUrl: string;
};

export default function PostVideoLink({ videoUrl }: Props) {
  return (
    <div className={cn('w-11/12 max-w-screen-3xl mt-4 mx-auto', 'lg:w-5/6')}>
      <TextArrowLink href={videoUrl} isExternal>
        <SvgYouTube
          className={cn(
            'w-6 h-6 mr-2 text-gray-400',
            'transition-colors duration-300 group-hover:text-red',
            'motion-reduce:transition-none',
            'dark:group-hover:text-white',
            'sm:w-7 sm:h-7 sm:mr-3',
            'xl:w-8 xl:h-8'
          )}
        />{' '}
        Watch it on YouTube
      </TextArrowLink>
    </div>
  );
}
