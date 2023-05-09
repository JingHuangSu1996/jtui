import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusScope, useFocusManager } from './';

describe('FocusScope', function () {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    act(() => jest.runAllTimers());
  });
  describe('focus manager', function () {
    it('should move focus forward', function () {
      function MockButton(props: any) {
        let focusManager = useFocusManager();
        let onClick = () => {
          (focusManager as any).focusNext();
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      let item1 = getByTestId('item1');
      let item2 = getByTestId('item2');
      let item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      fireEvent.click(item1);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item3);
      fireEvent.click(item3);
      expect(document.activeElement).toBe(item3);
    });

    it('should move focus backward', function () {
      function MockButton(props: any) {
        let focusManager = useFocusManager();
        let onClick = () => {
          (focusManager as any).focusPrevious();
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      let item1 = getByTestId('item1');
      let item2 = getByTestId('item2');
      let item3 = getByTestId('item3');

      act(() => {
        item3.focus();
      });

      fireEvent.click(item3);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item1);
      fireEvent.click(item1);
      expect(document.activeElement).toBe(item1);
    });

    it('should move focus forward and wrap around', function () {
      function MockButton(props: any) {
        let focusManager = useFocusManager();
        let onClick = () => {
          (focusManager as any).focusNext({ wrap: true });
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      let item1 = getByTestId('item1');
      let item2 = getByTestId('item2');
      let item3 = getByTestId('item3');

      act(() => {
        item1.focus();
      });

      fireEvent.click(item1);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item3);
      fireEvent.click(item3);
      expect(document.activeElement).toBe(item1);
    });

    it('should move focus backward and wrap around', function () {
      function MockButton(props: any) {
        let focusManager = useFocusManager();
        let onClick = () => {
          (focusManager as any).focusPrevious({ wrap: true });
        };
        return <button {...props} tabIndex={-1} onClick={onClick} />;
      }

      function Component() {
        return (
          <FocusScope>
            <MockButton data-testid="item1">item 1</MockButton>
            <MockButton data-testid="item2">item 2</MockButton>
            <MockButton data-testid="item3">item 3</MockButton>
          </FocusScope>
        );
      }

      const { getByTestId } = render(<Component />);
      let item1 = getByTestId('item1');
      let item2 = getByTestId('item2');
      let item3 = getByTestId('item3');

      act(() => {
        item3.focus();
      });

      fireEvent.click(item3);
      expect(document.activeElement).toBe(item2);
      fireEvent.click(item2);
      expect(document.activeElement).toBe(item1);
      fireEvent.click(item1);
      expect(document.activeElement).toBe(item3);
    });
  });

  describe('auto focus', function () {
    it('should auto focus first element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <button data-testid="item1">item 1</button>
            <button data-testid="item2">item 2</button>
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item1'));
    });

    it('should auto focus first tabbable element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <div />
            <button data-testid="item1">item 1</button>
            <button data-testid="item2">item 2</button>
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item1'));
    });

    it('should auto focus first tabbable element in the scope on mount', function () {
      function Component() {
        return (
          <FocusScope autoFocus>
            <button data-testid="item1">item 1</button>
            <input data-testid="item2" autoFocus />
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);
      expect(document.activeElement).toBe(screen.getByTestId('item2'));
    });
  });

  describe('contain', function () {
    it('should contain focus within the scope', function () {
      function Component() {
        return (
          <FocusScope contain>
            <button data-testid="item1">item 1</button>
            <button data-testid="item2">item 2</button>
            <button data-testid="item3">item 3</button>
          </FocusScope>
        );
      }

      render(<Component />);

      let item1 = screen.getByTestId('item1');
      let item2 = screen.getByTestId('item2');
      let item3 = screen.getByTestId('item3');

      act(() => {
        item1.focus();
      });

      userEvent.tab();
      expect(document.activeElement).toBe(item2);
      userEvent.tab();
      expect(document.activeElement).toBe(item3);
      userEvent.tab();
      expect(document.activeElement).toBe(item1);
      userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(item3);
      userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(item2);
      userEvent.tab({ shift: true });
      expect(document.activeElement).toBe(item1);
    });
  });

  describe('restore focus', function () {
    it.skip('should restore focus to the previously focused node after a child with autoFocus unmounts', function () {
      function Component({ show }: any) {
        return (
          <div>
            <input data-testid="outside" autoFocus />
            {show && (
              <FocusScope restoreFocus>
                <input data-testid="item1" autoFocus />
                <input data-testid="item2" />
                <input data-testid="item3" />
              </FocusScope>
            )}
          </div>
        );
      }

      const { getByTestId, rerender } = render(<Component />);

      let outside = getByTestId('outside');
      expect(document.activeElement).toBe(outside);
      rerender(<Component show />);
      let item1 = getByTestId('item1');
      expect(document.activeElement).toBe(item1);
      rerender(<Component />);
      expect(document.activeElement).toBe(outside);
    });
  });
});
