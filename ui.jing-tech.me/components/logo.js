import React from 'react';
import { styled, Icon } from '@washingtonpost/wpds-ui-kit';
import { Wp } from '@washingtonpost/wpds-assets';
import Link from 'next/link';

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  fontFamily: '$meta',
  fontWeight: '$light',
  cursor: 'pointer',
  gap: '$050',
  paddingLeft: '$125',
  color: '$primary',
  '@sm': {
    width: '100%',
  },
});
const Span = styled('span', {
  fontSize: '$125',
  color: '$primary',
  textDecoration: 'none',
  width: '100%',
});

export default function Logo() {
  return (
    <Link passHref href="/" aria-label="The Washington Post Design System's Homepage">
      <Container>
        <svg width="30" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.378.9v23.45c0 1.967-.183 3.65-.55 5.05-.333 1.367-1.033 2.467-2.1 3.3-.767.6-1.767 1.183-3 1.75-1.2.533-2.8.933-4.8 1.2l-.55-3.55c1.567-.267 2.8-.6 3.7-1 .933-.433 1.617-.95 2.05-1.55.467-.6.75-1.333.85-2.2.133-.867.2-1.883.2-3.05V.9h4.2Zm6.76 31.15c0-.8.283-1.483.85-2.05.567-.6 1.267-.9 2.1-.9.867 0 1.6.3 2.2.9.6.567.9 1.25.9 2.05 0 .833-.3 1.533-.9 2.1-.6.567-1.333.85-2.2.85-.833 0-1.533-.283-2.1-.85-.567-.567-.85-1.267-.85-2.1Z"
            fill="url(#logo_svg__a)"
          ></path>
          <defs>
            <linearGradient id="logo_svg__a" x1="13" y1="-12" x2="13" y2="48" gradientUnits="userSpaceOnUse">
              <stop stop-color="#6440F1" stop-opacity="0.53"></stop>
              <stop offset="0.618" stop-color="#5D48B3" stop-opacity="0.82"></stop>
              <stop offset="1" stop-color="#3A0EED"></stop>
            </linearGradient>
          </defs>
        </svg>
        <Span>Design system</Span>
      </Container>
    </Link>
  );
}
