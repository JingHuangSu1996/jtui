import { ReactNode } from 'react';

/**
 * ======== Type Declarations ========
 */
export type FocusScopeProps = {
  /** Add a description comment for each prop. */
  children: ReactNode;
  autoFocus?: Boolean;
  contain?: Boolean;
  restoreFocus?: Boolean;
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

export interface IFocusContext {
  focusManager: FocusManager;
}

// type ScopeRef = RefObject<Element[]>;

/**
 * ======== Utils ========
 */

const focusableElements = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
];

export const FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(',') + ',[tabindex]';

focusableElements.push('[tabindex]:not([tabindex="-1"])');

export const TABBABLE_ELEMENT_SELECTOR = focusableElements.join(':not([tabindex="-1"]),');

export let sharedState: { activeScope: Element[] | null } = {
  activeScope: null,
};

export function getScopeRoot(scope: Element[]) {
  return scope[0].parentElement;
}

export function getFocusableTreeWalker(root, opts: FocusManagerOptions, scope: Element[]) {
  const selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: FocusableElement) => {
      if (opts.from?.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (node.matches(selector) && (!scope || isElementInScope(node, scope))) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    },
  });
  if (opts.from) {
    walker.currentNode = opts.from;
  }
  return walker;
}

export function isElementInScope(el: Element, scope: Element[]) {
  return scope.includes(el) || scope.some((node) => node.contains(el));
}

export function focusFirstInScope(scope) {
  let sential = scope[0].previousElementSibling;
  const walker = getFocusableTreeWalker(getScopeRoot(scope), { tabbable: true }, scope);

  walker.currentNode = sential;
  focusElement(walker.nextNode() as FocusableElement);
}

export function focusElement(el: FocusableElement) {
  if (el !== null) {
    try {
      el.focus();
    } catch (err) {}
  }
}
