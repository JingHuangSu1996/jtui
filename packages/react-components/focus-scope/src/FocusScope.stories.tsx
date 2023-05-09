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
    <Component autoFocus>
      <MockButton data-testid="item1">item 1</MockButton>
      <MockButton data-testid="item2">item 2</MockButton>
      <MockButton data-testid="item3">item 3</MockButton>
    </Component>
  );
};

export const AutoFocus = Template.bind({});

AutoFocus.args = {};

const TemplateContain: StoryFn<typeof Component> = (args) => {
  const [show, setShow] = React.useState(false);
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

  React.useEffect(() => {
    const id = setInterval(() => {
      setShow((s) => !s);
    }, 4000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <input placeholder="outside" autoFocus />
      {show && (
        <Component autoFocus restoreFocus>
          <input placeholder="input1" />
          <input placeholder="input2" />
          <input placeholder="input3" />
        </Component>
      )}
    </div>
  );
};

export const Contain = TemplateContain.bind({});
