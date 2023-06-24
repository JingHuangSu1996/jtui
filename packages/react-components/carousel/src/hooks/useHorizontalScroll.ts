import { useState, useRef, useEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

export const THRESHOLD = 0.75;

const findFirstVisibleIndex = (itemRefs: HTMLElement[]) => {
  return itemRefs.findIndex((itemRef) => itemRef.getAttribute('visible'));
};

const findLastVisibleIndex = (itemRefs: HTMLElement[]) => {
  for (let i = itemRefs.length - 1; i >= 0; i--) {
    if (itemRefs[i].getAttribute('visible')) {
      return i;
    }
  }
  return -1;
};

const scrollToIndex = (itemRef: HTMLElement, scrollIntoViewSmoothly: any, containerRef?: any, scrollStep?: number) => {
  if (itemRef) {
    scrollIntoViewSmoothly(itemRef, {
      block: 'nearest',
      inline: scrollStep === 1 ? 'center' : 'nearest',
      boundary: containerRef,
      behavior: 'smooth',
    });
  }
};

const scrollToStep = (
  scrollStep: number,
  itemRefs: HTMLElement[],
  scrollIntoViewSmoothly: any,
  containerRef: any,
  direction: string,
) => {
  const actualScrollForIndex = calculateActualScrollForIndex(itemRefs, scrollStep, direction === 'left');

  scrollToIndex(itemRefs[actualScrollForIndex], scrollIntoViewSmoothly, containerRef, scrollStep);
};

const calculateActualScrollForIndex = (itemRefs: HTMLElement[], scrollStep: number, toLeft: boolean) => {
  if (toLeft) {
    const firstVisibleIndex = findFirstVisibleIndex(itemRefs);
    console.log('toLeft', firstVisibleIndex, scrollStep);
    const actualScrollForIndex = firstVisibleIndex < scrollStep ? 0 : firstVisibleIndex - scrollStep;
    return actualScrollForIndex;
  }

  const lastVisibleIndex = findLastVisibleIndex(itemRefs);
  const lastIndex = itemRefs.length - 1;
  const actualScrollForIndex = lastIndex - lastVisibleIndex < scrollStep ? lastIndex : lastVisibleIndex + scrollStep;

  return actualScrollForIndex;
};

const showHideIndecators = (
  itemRefs: HTMLElement[],
  setLeftIndicator: (isShow: boolean) => void,
  setRightIndicator: (isShow: boolean) => void,
  setFirstVisibleIndex: (index: number) => void,
  setLastVisibleIndex: (index: number) => void,
) => {
  const firstVisibleIndex = findFirstVisibleIndex(itemRefs);
  const lastVisibleIndex = findLastVisibleIndex(itemRefs);

  setFirstVisibleIndex(firstVisibleIndex);
  setLastVisibleIndex(lastVisibleIndex);

  lastVisibleIndex < itemRefs.length - 1 ? setRightIndicator(true) : setRightIndicator(false);
  firstVisibleIndex > 0 ? setLeftIndicator(true) : setLeftIndicator(false);

  if (firstVisibleIndex === -1) {
    itemRefs.length > 0 ? setLeftIndicator(true) : setLeftIndicator(false);
  }

  if (lastVisibleIndex === -1) {
    itemRefs.length > 0 ? setRightIndicator(true) : setRightIndicator(false);
  }
};

const useHorizontalScroll = (options) => {
  const [leftIndicator, setLeftIndicator] = useState(false);
  const [rightIndicator, setRightIndicator] = useState(false);
  const [firstVisibleIndex, setFirstVisibleIndex] = useState(-1);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(-1);
  const [itemsCount, setItemsCount] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollStep, scrollInContainer, scrollTo } = options;
  const itemRefs: HTMLElement[] = [];
  let scrollIntoViewSmoothly = scrollIntoView;

  /**
   * Set visible attribute to items
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { intersectionRatio } = entry;

          intersectionRatio > THRESHOLD
            ? entry.target.setAttribute('visible', 'true')
            : entry.target.removeAttribute('visible');

          showHideIndecators(itemRefs, setLeftIndicator, setRightIndicator, setFirstVisibleIndex, setLastVisibleIndex);
        });
      },
      { root: containerRef.current, threshold: THRESHOLD },
    );

    itemRefs.forEach((itemRef) => observer.observe(itemRef));

    return () => itemRefs.forEach((itemRef) => observer.unobserve(itemRef));
  }, []);

  /**
   * Check if smooth scroll is supported, If not, use scrollIntoView
   */
  useEffect(() => {
    if (!document) {
      return;
    }

    scrollIntoViewSmoothly = 'scrollBehavior' in document.documentElement.style ? scrollIntoView : smoothScrollIntoView;
  });

  useEffect(() => {
    if (!scrollTo || !itemRefs.length) {
      return;
    }

    if (scrollTo && scrollTo < itemRefs.length - 1) {
      scrollToIndex(
        itemRefs[scrollTo + 1],
        scrollIntoViewSmoothly,
        scrollInContainer && containerRef && containerRef.current,
      );
    }

    if (scrollTo && scrollTo === itemRefs.length - 1) {
      scrollToIndex(
        itemRefs[scrollTo],
        scrollIntoViewSmoothly,
        scrollInContainer && containerRef && containerRef.current,
      );
    }
  }, []);

  const itemRef = (element: HTMLElement) => {
    if (!element) {
      return;
    }
    itemRefs.push(element);
    setItemsCount(itemRefs.length);
  };

  return {
    itemRef,
    containerRef,
    scrollLeftToStep: () => {
      scrollToStep(
        scrollStep || 0,
        itemRefs,
        scrollIntoViewSmoothly,
        scrollInContainer && containerRef && containerRef.current,
        'left',
      );
    },
    scrollRightToStep: () => {
      scrollToStep(
        scrollStep || 0,
        itemRefs,
        scrollIntoViewSmoothly,
        scrollInContainer && containerRef && containerRef.current,
        'right',
      );
    },
    scrollToIndex: (index: number) => {
      scrollToIndex(itemRefs[index], scrollIntoViewSmoothly, scrollInContainer && containerRef && containerRef.current);
    },
    canScrollLeft: leftIndicator,
    canScrollRight: rightIndicator,
    firstVisibleIndex,
    lastVisibleIndex,
    itemsCount,
  };
};

export default useHorizontalScroll;
