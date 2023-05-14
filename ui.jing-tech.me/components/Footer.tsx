import React from 'react';
import { styled } from '@jtui/theme';
import { useRouter } from 'next/router';

const EditInGithub = styled('a', {
  display: 'flex',
  textDecoration: 'none',
  color: '$colors$onSecondary',
  fontSize: '$087',
  fontWeight: '$light',
  lineHeight: '$087',
  textAlign: 'left',
  marginTop: '$050',
  marginBottom: '$200',
  '&:hover': {
    textDecoration: 'underline',
  },
  '@sm': {
    marginLeft: '$100',
  },
});

const Box = styled('div', {
  gridArea: 'footer',
  paddingTop: '$050',
  marginBottom: '$100',
  marginTop: '$500',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1028px',
  width: '100%',

  '@sm': {
    marginTop: '$200',
    'footer.site-footer': {
      display: 'none',
    },
  },
});

const Footer = () => {
  const router = useRouter();
  return (
    <Box>
      {/* // slug aka a mdx file */}
      {router?.route?.includes('slug') && (
        <EditInGithub
          href={`https://github.com/JingHuangSu1996/jtui/edit/master/ui.jing-tech.me/docs/${router.asPath.replace(
            '/',
            '',
          )}.mdx`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this page on GitHub.
        </EditInGithub>
      )}
      <div id="footer-v3"></div>
    </Box>
  );
};

export default Footer;
