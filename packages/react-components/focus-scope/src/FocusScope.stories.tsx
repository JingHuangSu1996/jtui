import * as React from 'react';
import { FocusScope as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'FocusScope',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const FocusScope = Template.bind({});

FocusScope.args = {};
