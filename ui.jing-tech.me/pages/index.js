import React from 'react';
import ThemeToggle from '~/components/ThemeToggle';
import { theme } from '@jtui/theme';
import { getAllDocs, getNavigation } from '~/services';

export const sortByRank = (docs, numToReturn) => {
  return docs
    .sort(function (a, b) {
      try {
        return a.data.rank - b.data.rank;
      } catch (TypeError) {
        return a.data.title.localeCompare(b.data.title);
      }
    })
    .slice(0, numToReturn);
};

const Index = () => {
  return (
    <div style={{ background: theme.colors['color-background-default'], height: '100vh' }}>
      <ThemeToggle
        css={{
          position: 'fixed',
          zIndex: '$page',
          '@notSm': {
            marginTop: '-$100',
          },
          '@sm': {
            top: '$100',
            right: '$400',
          },
        }}
      />
    </div>
  );
};
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

  // const contributors = await getContributors();

  return {
    props: { recentPosts, rankedArticles, navigation },
  };
}
