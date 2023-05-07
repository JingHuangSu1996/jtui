import React, { ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { getFocusElementScope } from './utils';

type FocusScopeProps = {
  /** Add a description comment for each prop. */
  children: ReactNode;
};

export interface FocusableElement extends Element, HTMLOrSVGElement {}

export interface FocusManagerOptions {
  /** The element to start searching from. The currently focused element by default. */
  from?: Element;
  /** Whether to only include tabbable elements, or all focusable elements. */
  tabbable?: boolean;
  /** Whether focus should wrap around when it reaches the end of the scope. */
  wrap?: boolean;
}
export interface FocusManager {
  /** Moves focus to the next focusable or tabbable element in the focus scope. */
  focusNext(opts?: FocusManagerOptions): FocusableElement;
  /** Moves focus to the previous focusable or tabbable element in the focus scope. */
  focusPrevious(opts?: FocusManagerOptions): FocusableElement;
}

interface IFocusContext {
  focusManager: FocusManager;
}

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

export const FocusScope = ({ children }: FocusScopeProps) => {
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

  let focusManager: FocusManager = createFocusManager(scopeRef);

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
