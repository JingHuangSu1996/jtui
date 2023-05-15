import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import { styled, theme } from '@jtui/theme';
import * as Radix from 'radix-ui';
import { StyledText } from '~/components/Text';
import { H1, H2, H3, H4 } from '~/components/Heading';

import { getAllPathsBySection, getDocByPathName, getHeadings, getNavigation } from '~/services';
import { Paragraph } from '~/components/Paragraph';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover';

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  PopoverTrigger: PopoverTrigger,
  Popover: Popover,
  PopoverContent: PopoverContent,
};

export default function Page({ current, source, headings, propsTable, bundleSize, componentName }) {
  return (
    <div>
      <NextSeo title={`JTUI - ${source.scope.title} | Components`} description={source.scope.description}></NextSeo>
      <MDXRemote components={components} {...source} />
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

  const [source, headings, navigation] = await Promise.all([
    getDocByPathName(`${thisSection}/${params.slug}`),
    getHeadings(`${thisSection}/${params.slug}`),
    getNavigation(),
  ]);

  return {
    props: {
      current: params.slug,
      headings,
      source,
      propsTable,
      bundleSize,
      componentName,
      navigation,
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
