import React from 'react';
import { NextSeo } from 'next-seo';
import { getNavigation } from '~/services';
import { Icon, styled } from '@washingtonpost/wpds-ui-kit';
import Header from '~/components/Typography/Headers';
import Link from '~/components/Markdown/Components/link';
import External from '@washingtonpost/wpds-assets/asset/external';
import { P } from '~/components/Markdown/Styling';

const Card = styled('article', {
  border: '1px solid $subtle',
  borderRadius: '$050',
  px: '$150',
  paddingTop: '$100',
  paddingBottom: '$100',
  marginBottom: '$150',
});

export default function Page() {
  return (
    <>
      <NextSeo title={`JTUI - Release Notes`} description="Release notes for JTUI, the Jing Tech Design System." />
      <header>
        <Header as="h1">Release notes</Header>
      </header>

      <section>
        <Link href="https://github.com/" target="_blank" rel="noopener" noUnderline>
          <Card>
            <Header as="h2">
              Ui Kit Release notes{' '}
              <Icon size="100">
                <External></External>
              </Icon>
            </Header>
          </Card>
        </Link>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const navigation = await getNavigation();

  return {
    props: {
      navigation,
    },
  };
};
