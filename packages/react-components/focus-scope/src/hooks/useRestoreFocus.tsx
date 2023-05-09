import { useLayoutEffect } from 'react';
import { focusElement } from '../shared';

export const useRestoreFocus = (restoreFocus) => {
  useLayoutEffect(() => {
    const nodeToRestore = document.activeElement as HTMLElement;

    return () => {
      if (restoreFocus && nodeToRestore) {
        requestAnimationFrame(() => {
          if (document.body.contains(nodeToRestore)) {
            focusElement(nodeToRestore);
          }
        });
      }
    };
  }, [restoreFocus]);
};
