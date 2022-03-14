import Head from 'next/head';
import { Route } from '../lib/types';
import {
  MAIN_AUTHOR,
  MAIN_TITLE,
  MAIN_URL,
  SEO_DEFAULT_IMAGE,
  SEO_DEFAULT_IMAGE_HEIGHT,
  SEO_DEFAULT_IMAGE_WIDTH,
  SITE_NAME,
} from '../lib/constants';

export type Props = {
  path: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function SeoTags({
  path,
  title,
  description,
  imageUrl = SEO_DEFAULT_IMAGE,
  imageWidth = SEO_DEFAULT_IMAGE_WIDTH,
  imageHeight = SEO_DEFAULT_IMAGE_HEIGHT,
}: Props) {
  const isIndex = path === Route.HOME;
  const metaUrl = `${MAIN_URL}${path}${!isIndex ? '/' : ''}`;
  const metaTitle = `${title} | ${MAIN_TITLE}`;
  const fullImgUrl = `${MAIN_URL}${imageUrl}`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={description} />
      <meta name="author" content={MAIN_AUTHOR} />
      <link rel="canonical" href={metaUrl} />
      <link rel="icon" href={`${MAIN_URL}/favicon.ico`} />
      <link rel="manifest" href={`${MAIN_URL}/manifest.json`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={fullImgUrl} />
      <meta property="og:image:secure_url" content={fullImgUrl} />
      <meta property="og:image:width" content={`${imageWidth}`} />
      <meta property="og:image:height" content={`${imageHeight}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={fullImgUrl} />
      <title>{metaTitle}</title>
    </Head>
  );
}
