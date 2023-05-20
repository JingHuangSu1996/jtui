import { RefObject, useEffect, useRef } from 'react';
import {
  FocusableElement,
  isElementInScope,
  sharedState,
  focusFirstInScope,
  focusElement,
  getFocusableTreeWalker,
  getScopeRoot,
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

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable: true }, scope);
      walker.currentNode = focusedElement;

      const lastPosition = scope.length - 1;
      let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();

      if (!nextElement) {
        walker.currentNode = e.shiftKey ? scope[lastPosition].nextElementSibling : scope[0].previousElementSibling;
        nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
      }

      e.preventDefault();

      if (nextElement) {
        focusElement(nextElement as FocusableElement);
      }
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
