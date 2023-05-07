import * as React from 'react';
import { FocusScope as Component, useFocusManager } from './';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'FocusScope',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => {
  function MockButton(props: any) {
    let focusManager = useFocusManager();
    let onKeyDown = (e) => {
      console.log(e.key);

      switch (e.key) {
        case 'ArrowRight':
          focusManager.focusNext({ wrap: true });
          break;
        case 'ArrowLeft':
          focusManager.focusPrevious({ wrap: true });
          break;
        default:
          break;
      }
    };

    return (
      <button {...props} onKeyDown={onKeyDown}>
        {props.children}
      </button>
    );
  }

  return (
    <Component autoFocus contain>
      <MockButton data-testid="item1">item 1</MockButton>
      <MockButton data-testid="item2">item 2</MockButton>
      <MockButton data-testid="item3">item 3</MockButton>
    </Component>
  );
};

export const FocusScope = Template.bind({});

FocusScope.args = {};
