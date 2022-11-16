import Head from "next/head";
import SEO from "@src/interfaces/Seo";
import { siteMetadata } from "@src/data/Metadata";

const HeadSeo = ({
  title,
  description,
  author,
  articleAuthor,
  publicationDate,
  articlePublishedTime,
  keywords,
  siteUrl,
  canonicalUrl,
  articleModifiedTime,
  ogUpdatedTime,
  ogImageUrl,
  ogTwitterImage,
  ogLocale,
  ogType,
  children,
}: SEO) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#00a671"/>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="article:author" content={articleAuthor} />
      <meta name="publication_date" content={publicationDate} />
      <meta name="article:published_time" content={articlePublishedTime} />
      <meta name="article:modified_time" content={articleModifiedTime} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogTwitterImage} />

      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={siteMetadata.companyName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:updated_time" content={ogUpdatedTime} />

      <link rel="canonical" href={canonicalUrl} />

      {children}
    </Head>
  );
};

export default HeadSeo;
