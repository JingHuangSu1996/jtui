import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { useAutoFocus } from './hooks/useAutoFocus';
import { useFocusContainment } from './hooks/useFocusContainment';
import { useRestoreFocus } from './hooks/useRestoreFocus';
import {
  IFocusContext,
  FocusManager,
  FocusManagerOptions,
  FocusScopeProps,
  getFocusableTreeWalker,
  getScopeRoot,
  isElementInScope,
  focusElement,
  FocusableElement,
} from './shared';

const FocusContext = React.createContext<IFocusContext>(null);

export const useFocusManager = (): FocusManager => {
  return useContext(FocusContext)?.focusManager;
};

export const createFocusManager = (scopeRef: RefObject<Element[]>): FocusManager => {
  return {
    focusNext: (opts: FocusManagerOptions = {}): any => {
      const scope = scopeRef.current;
      const { from, tabbable, wrap } = opts;
      let node = from || document.activeElement;
      const sential = scope[0].previousElementSibling;

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);

      walker.currentNode = isElementInScope(node, scope) ? node : sential;

      let nextNode = walker.nextNode();

      if (!nextNode && wrap) {
        walker.currentNode = sential;
        nextNode = walker.nextNode();
      }

      if (nextNode) {
        focusElement(nextNode as FocusableElement);
      }

      return nextNode;
    },
    focusPrevious: (opts: FocusManagerOptions = {}): any => {
      const scope = scopeRef.current;
      const { from, tabbable, wrap } = opts;
      let node = from || document.activeElement;
      const sential = scope[scope.length - 1].nextElementSibling;

      const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable }, scope);

      walker.currentNode = isElementInScope(node, scope) ? node : sential;

      let previousNode = walker.previousNode();

      if (!previousNode && wrap) {
        walker.currentNode = sential;
        previousNode = walker.previousNode();
      }

      if (previousNode) {
        focusElement(previousNode as FocusableElement);
      }

      return previousNode;
    },
  };
};

export const FocusScope = ({ children, autoFocus, contain, restoreFocus }: FocusScopeProps) => {
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const scopeRef = useRef<Element[]>([]);

  useEffect(() => {
    let node = startRef.current?.nextSibling;
    const nodes: Element[] = [];

    while (node && node !== endRef.current) {
      nodes.push(node as Element);
      node = node.nextSibling;
    }
    scopeRef.current = nodes;
  }, [children]);

  useAutoFocus(scopeRef, autoFocus);
  useFocusContainment(scopeRef, contain);
  useRestoreFocus(restoreFocus);

  let focusManager = createFocusManager(scopeRef);

  return (
    <FocusContext.Provider value={{ focusManager }}>
      <span hidden ref={startRef} />
      {children}
      <span hidden ref={endRef} />
    </FocusContext.Provider>
  );
};

FocusScope.displayName = 'FocusScope';

export type { FocusScopeProps };
