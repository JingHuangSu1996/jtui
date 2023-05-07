import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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
});
