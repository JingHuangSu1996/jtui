import React from 'react';

type FocusScopeProps = {
  /** Add a description comment for each prop. */
};

export const FocusScope = React.forwardRef<HTMLDivElement, FocusScopeProps>(({}, ref) => {
  return <div>Hello World</div>;
});

FocusScope.displayName = 'FocusScope';

export type { FocusScopeProps };
