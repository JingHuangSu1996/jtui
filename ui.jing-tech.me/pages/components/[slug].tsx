import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import { styled, theme } from '@jtui/theme';

import { getAllPathsBySection, getDocByPathName, getHeadings } from '~/services';

export default function Page({ current, source, headings, propsTable, bundleSize, componentName }) {
  return (
    <div>
      <NextSeo title={`JTUI - ${source.scope.title} | Components`} description={source.scope.description}></NextSeo>
      <MDXRemote {...source} />
    </div>
  );
}

const thisSection = 'components';

export const getStaticProps = async ({ params }) => {
  const toTitleCase = (str) =>
    str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

  const componentName = toTitleCase(params.slug);

  let propsTable = [];
  let bundleSize = null;

  const [source, headings] = await Promise.all([
    getDocByPathName(`${thisSection}/${params.slug}`),
    getHeadings(`${thisSection}/${params.slug}`),
  ]);

  return {
    props: {
      current: params.slug,
      headings,
      source,
      propsTable,
      bundleSize,
      componentName,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllPathsBySection(thisSection);

  return {
    paths,
    fallback: false,
  };
};
