import Head from 'next/head';
import { MAIN_TITLE, MAIN_URL } from '../lib/constants';

function SeoTags({
  path,
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
}: {
  path: string;
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}) {
  const isIndex = path === '/';
  const metaUrl = isIndex ? MAIN_URL : `${MAIN_URL}${path}`;
  const metaTitle = isIndex ? title : `${title} - ${MAIN_TITLE}`;

  return (
    <Head>
      <meta name="description" content={description} />
      <link rel="canonical" href={metaUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={metaTitle} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content={`${imageWidth}`} />
      <meta property="og:image:height" content={`${imageHeight}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:image" content={imageUrl} />
      <title>{metaTitle}</title>
    </Head>
  );
}

export default SeoTags;
