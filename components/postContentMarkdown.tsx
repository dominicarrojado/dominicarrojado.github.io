import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
// @ts-ignore: using an old rehype-highlight version that has no declaration file
import rehypeHighlight from 'rehype-highlight';
import Content from './content';
import AnchorLink from './anchorLink';
import AdUnit from './adUnit';
import NextLink from './nextLink';
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
  Route,
} from '../lib/types';
import { ROUTES } from '../lib/constants';
import 'highlight.js/styles/vs2015.css';

export type Props = { content: string };

function PostContentMarkdown({ content }: Props) {
  return (
    <Content className={cn('mt-8', 'sm:mt-10', 'xl:mt-14')}>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkUnwrapImages, remarkGfm]}
        components={{
          a: ({ node, ...props }) => {
            const { href, ...otherProps } = props;
            const isInternal =
              typeof href === 'string' && href.startsWith(Route.HOME);

            if (isInternal) {
              const anchorHref = href as string;
              const isNextRoute =
                anchorHref === Route.HOME ||
                ROUTES.some(
                  (route) =>
                    route !== Route.HOME && anchorHref.startsWith(route)
                );

              if (isNextRoute) {
                return (
                  <NextLink href={anchorHref}>
                    <a {...otherProps} />
                  </NextLink>
                );
              }
            }

            return (
              <AnchorLink
                {...props}
                target="_blank"
                isExternal={!isInternal}
                ref={undefined}
              />
            );
          },
          img: ({ node, ...props }) => {
            const altText = props.alt as string;

            return <img {...props} alt={altText} loading="lazy" />;
          },
          hr: () => (
            <AdUnit
              adSlot={GoogleAdSenseUnit.POST_BODY}
              adFormat={GoogleAdSenseUnitFormat.FLUID}
              adLayout={GoogleAdSenseUnitLayout.IN_ARTICLE}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Content>
  );
}

export default React.memo(PostContentMarkdown);
