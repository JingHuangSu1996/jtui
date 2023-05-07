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

export function getFocusElementScope(scope: Element[], opts: any) {
  let res = [];

  let selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;

  for (let node of scope) {
    if (node.matches(selector)) {
      res.push(node);
    }
    res.push(...Array.from(node.querySelectorAll(selector)));
  }

  return res;
}
