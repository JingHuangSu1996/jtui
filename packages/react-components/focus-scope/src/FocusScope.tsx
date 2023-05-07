import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { useAutoFocus } from './hooks/useAutoFocus';
import { getFocusElementScope, IFocusContext, FocusManager, FocusManagerOptions, FocusScopeProps } from './shared';

const FocusContext = React.createContext<IFocusContext>(null);

export const useFocusManager = (): FocusManager => {
  return useContext(FocusContext)?.focusManager;
};

export const createFocusManager = (scopeRef: RefObject<Element[]>): FocusManager => {
  return {
    focusNext: (opts: FocusManagerOptions) => {
      let node = opts?.from || document.activeElement;
      let focusable = getFocusElementScope(scopeRef.current, opts);

      let nextNode = focusable.find(
        (el) =>
          !!(
            (node as HTMLElement).compareDocumentPosition(el) &
            (Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY)
          ),
      );

      if (!nextNode && opts?.wrap) {
        nextNode = focusable[0];
      }

      if (nextNode) {
        (nextNode as HTMLElement).focus();
      }

      return nextNode;
    },
    focusPrevious: (opts: FocusManagerOptions) => {
      let node = opts?.from || document.activeElement;
      let focusable = getFocusElementScope(scopeRef.current, opts).reverse();

      let previousNode = focusable.find(
        (el) =>
          !!(
            (node as HTMLElement).compareDocumentPosition(el) &
            (Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINED_BY)
          ),
      );

      if (!previousNode && opts?.wrap) {
        previousNode = focusable[0];
      }

      if (previousNode) {
        (previousNode as HTMLElement).focus();
      }

      return previousNode;
    },
  };
};

export const FocusScope = ({ children, autoFocus }: FocusScopeProps) => {
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
