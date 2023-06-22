import React from 'react';
import { Box, styled } from '@washingtonpost/wpds-ui-kit';
import { useRouter } from 'next/router';
import Script from 'next/script';

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

export const Footer = () => {
  const router = useRouter();
  return (
    <Box
      css={{
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
      }}
    ></Box>
  );
};
