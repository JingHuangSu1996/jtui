# `jtui/core`

## Installation

```sh
$ yarn add @jtui/core
# or
$ npm install @jtui/core
```

```tsx
import { useControlledState } from '@jtui/core';

function MyComponent({ value: controlledValue }) {
  const [value, setValue] = useControllableState('controlledValue');
  // ...
}
```
