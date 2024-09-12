import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import AdUnit from './adUnit';
import Section from './section';
import PostContentMarkdown from './postContentMarkdown';
import PostHeader from './postHeader';
import PostVideoLink from './postVideoLink';
import PostFooter from './postFooter';
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  PostData,
} from '../lib/types';
import 'highlight.js/styles/vs2015.css';

export type Props = {
  postData: PostData;
};

export default function PostContent({ postData }: Props) {
  const { videoUrl } = postData;
  const shouldDisplay = useMounted();

  return (
    <Section
      className={cn(
        'transform transition-transform-opacity duration-700',
        'motion-reduce:transition-none',
        shouldDisplay ? 'opacity-100' : 'opacity-0'
      )}
      data-testid="section"
    >
      <AdUnit
        adSlot={GoogleAdSenseUnit.POST_HEADER}
        adFormat={GoogleAdSenseUnitFormat.AUTO}
        className={cn(
          'mx-auto -mt-8 w-11/12 max-w-screen-3xl pb-8',
          'sm:-mt-10 sm:pb-10',
          'md:-mt-12 md:pb-12',
          'lg:w-5/6'
        )}
      />
      <PostHeader date={postData.date} category={postData.category} />
      {videoUrl && <PostVideoLink videoUrl={videoUrl} />}
      <PostContentMarkdown content={postData.content} />
      <PostFooter
        previousPost={postData.previousPost}
        nextPost={postData.nextPost}
      />
      <AdUnit
        adSlot={GoogleAdSenseUnit.POST_FOOTER}
        adFormat={GoogleAdSenseUnitFormat.AUTO}
        className={cn(
          'mx-auto -mb-8 w-11/12 max-w-screen-3xl pt-8',
          'sm:-mb-10 sm:pt-10',
          'md:-mb-12 md:pt-12',
          'lg:w-5/6'
        )}
      />
    </Section>
  );
}
