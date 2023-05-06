import * as React from 'react';
import { Button as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Button',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Button = Template.bind({});

Button.args = {};
