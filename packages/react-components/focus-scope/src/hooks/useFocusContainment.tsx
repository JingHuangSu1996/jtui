import { RefObject, useEffect, useRef } from 'react';
import {
  FocusableElement,
  isElementInScope,
  getFocusElementScope,
  sharedState,
  focusFirstInScope,
  focusElement,
} from '../shared';

export const useFocusContainment = (scopeRef: RefObject<Element[]>, contain: Boolean) => {
  let focusNode = useRef<FocusableElement>();

  useEffect(() => {
    if (!contain) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      const focusedElement = document.activeElement;
      const scope = scopeRef.current;
      if (!isElementInScope(focusedElement, scope)) {
        return;
      }

      const focusableElements = getFocusElementScope(scope, { tabbable: true });
      const lastPosition = focusableElements.length - 1;
      let position = focusableElements.indexOf(focusedElement);
      let nextElement = null;

      if (e.shiftKey) {
        if (position === 0) {
          nextElement = focusableElements[lastPosition];
        } else {
          nextElement = focusableElements[position - 1];
        }
      } else {
        if (position === lastPosition) {
          nextElement = focusableElements[0];
        } else {
          nextElement = focusableElements[position + 1];
        }
      }
      e.preventDefault();
      focusElement(nextElement);
    };

    const onFocus = (e: FocusEvent) => {
      const scope = scopeRef.current;
      let isInScope = isElementInScope(e.target as Element, scope);

      if (isInScope && (!sharedState.activeScope || !isElementInScope(e.target as Element, sharedState.activeScope))) {
        sharedState.activeScope = scope;
      }

      if (isInScope) {
        focusNode.current = e.target as FocusableElement;
      }

      if (sharedState.activeScope === scope) {
        if (focusNode.current) {
          focusNode.current.focus();
        } else {
          focusFirstInScope(scope);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('focusin', onFocus, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('focusin', onFocus, false);
    };
  }, [scopeRef, contain]);
};
