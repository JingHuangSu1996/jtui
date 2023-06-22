import React from 'react';
import { Box, styled, theme, Divider } from '@washingtonpost/wpds-ui-kit';

import { getAllDocs, getNavigation } from '~/services';
import { Header } from '~/components/Markdown/Components/headers';
import { LinkText, List, ListItem } from '~/components/Markdown/Components/list';
import { LandingContentGrid, ContentGrid } from '~/components/Markdown/Components/ResourcesGrids';
import { SeeAllLink, sortByRank, NewCustomLink } from '~/components/utils';

import Link from 'next/link';

const HeroBlock = styled('div', {
  gridColumn: 'span 2',
  flexDirection: 'column',
  justifyContent: 'center',
  '@md': {
    gridColumn: 'span 3',
  },
  '@sm': {
    gridColumn: 'span 1',
  },
});

const P = styled('p', {
  color: theme.colors.accessible,
  fontSize: theme.fontSizes[100],
  fontWeight: theme.fontWeights.light,
  lineHeight: theme.lineHeights[125],
  marginBlockStart: 0,
  marginBlockEnd: theme.space['100'],
});

const BoldTextLooksLikeLink = styled('span', {
  fontWeight: 'bold',
  textDecoration: 'underline',
  marginTop: theme.sizes[100],
  '@notSm': {
    bottom: 0,
    position: 'absolute',
  },
});

const Index = ({ recentPosts, rankedArticles, contributors }) => {
  return (
    <>
      <LandingContentGrid size="wide">
        <Box
          css={{
            gridColumn: 'span 2',
            '@sm': {
              gridColumn: 'span 1',
            },
          }}
        >
          <Header as="h1">Welcome</Header>
        </Box>
        <Box
          css={{
            display: 'flex',
            alignItems: 'flex-end',
            '@md': { display: 'none' },
            '@sm': { display: 'none' },
          }}
        >
          <Header
            href="/resources"
            as="h2"
            css={{
              fontSize: '$125',
              fontFamily: '$subhead',
              fontWeight: '$bold',
              marginBottom: '$025',
              marginTop: '$100',
            }}
          >
            What&apos;s new
          </Header>
        </Box>
        <HeroBlock>
          <P css={{ fontSize: '$125', marginBottom: theme.sizes[125] }}>Jing Tech Design System</P>
        </HeroBlock>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: theme.sizes[100],
            '@md': { display: 'none' },
            '@sm': { display: 'none' },
          }}
        >
          <List>
            {recentPosts &&
              recentPosts.map((post, i) => {
                return (
                  <ListItem css={{ display: `${i > 5 ? 'none' : ''}` }} key={i}>
                    <P
                      css={{
                        color: theme.colors.primary,
                        fontSize: theme.fontSizes['075'],
                        fontWeight: theme.fontWeights.bold,
                        marginBottom: '0',
                      }}
                    >
                      {post.data.publishDate}
                    </P>
                    <NewCustomLink css={{ fontSize: '075' }} href={post.slug}>
                      {post.data.title}
                    </NewCustomLink>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </LandingContentGrid>

      <Box
        css={{
          gridColumn: '1/-1',
        }}
      >
        <Header
          as="h2"
          css={{
            borderTop: '1px solid $subtle',
            marginBottom: theme.sizes[100],
            paddingTop: theme.sizes[100],
            '@sm': { marginTop: 0 },
          }}
        >
          Getting started
        </Header>
        <LinkText href="https://www.designsystemchecklist.com/">https://www.designsystemchecklist.com/</LinkText>
      </Box>
    </>
  );
};

const todaysDate = new Date();

Index.displayName = 'Index';

export default Index;
export async function getStaticProps() {
  const posts = await getAllDocs();
  const navigation = await getNavigation();

  const guides = [];
  const workshops = [];

  const recentPosts = posts
    .filter((post) => {
      if (post.data.kicker === 'Guides') {
        guides.push(post);
      }
      if (post.data.kicker === 'Workshops') {
        workshops.push(post);
      }
      return post.data.publishDate && new Date(post.data.publishDate) <= todaysDate && post.slug.includes('resources');
    })
    .sort((a, b) => {
      return new Date(a.data.publishDate) - new Date(b.data.publishDate);
    })
    .reverse();

  const threshold = 4;
  if (recentPosts.length > threshold) {
    const amountOver = recentPosts.length - threshold;
    recentPosts.splice(threshold, amountOver);
  }

  // uses the ranks inside the docs
  const rankedArticles = [...sortByRank(workshops, 4), ...sortByRank(guides, 2)];

  return {
    props: { recentPosts, rankedArticles, navigation },
  };
}
