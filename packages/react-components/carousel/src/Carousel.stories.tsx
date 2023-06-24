import * as React from 'react';
import { Carousel as Component } from './';

import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Carousel',
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Component.Item key={i}>{i}</Component.Item>
    ))}
  </Component>
);

export const Carousel = Template.bind({});

Carousel.args = {
  scrollTo: 0,
};
