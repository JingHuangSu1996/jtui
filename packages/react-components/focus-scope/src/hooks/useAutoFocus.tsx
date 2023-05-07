import { useEffect } from 'react';
import { sharedState, isElementInScope, focusFirstInScope } from '../shared';

export const useAutoFocus = (scopeRef, autoFocus) => {
  useEffect(() => {
    if (autoFocus) {
      sharedState.activeScope = scopeRef.current;
      if (!isElementInScope(document.activeElement, sharedState.activeScope)) {
        focusFirstInScope(scopeRef.current);
      }
    }
  }, [scopeRef, autoFocus]);
};
