// React ts template
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { css, styled } from '@jtui/theme';

const hasWindow = () => {
  return typeof window !== 'undefined';
};

function ThemeToggle(props) {
  const { setTheme, resolvedTheme } = useTheme();
  const [env, setEnv] = useState('');

  useEffect(() => {
    setEnv(hasWindow() ? 'browser' : 'server');
  }, []);

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === 'light' ? 'dark' : 'light';

    console.log(targetTheme);
    setTheme(targetTheme);
  };

  const Button = styled('button', {
    appearance: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    border: 0,
    fontSize: '$150',
  });

  const showOnDarkTheme = css({
    display: 'none',
    '@dark': {
      display: 'block',
    },
  });

  const showOnLightTheme = css({
    display: 'none',
    '@light': {
      display: 'block',
    },
  });

  return (
    <Button css={props.css} onClick={toggleTheme} aria-label="Switch theme">
      <span className={showOnDarkTheme()}>
        {env === 'browser' && resolvedTheme === 'light' ? '🌞' : '🌕'}
        {env === 'server' && '🌕'}
      </span>
      <span className={showOnLightTheme()}>
        {env === 'browser' && resolvedTheme === 'light' ? '🌞' : '🌕'}
        {env === 'server' && '🌞'}
      </span>
      <span>Switch theme</span>
    </Button>
  );
}

export default ThemeToggle;
