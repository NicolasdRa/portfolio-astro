import { describe, it, expect, beforeEach } from 'vitest';
import { useUiStore } from './cursor.store';

describe('Cursor Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUiStore.setState({ cursorType: 'default' });
  });

  it('initializes with default cursor type', () => {
    const { cursorType } = useUiStore.getState();
    expect(cursorType).toBe('default');
  });

  it('updates cursor type to hover', () => {
    const { setCursorType } = useUiStore.getState();
    setCursorType('hover');

    const { cursorType } = useUiStore.getState();
    expect(cursorType).toBe('hover');
  });

  it('updates cursor type to hover-social', () => {
    const { setCursorType } = useUiStore.getState();
    setCursorType('hover-social');

    const { cursorType } = useUiStore.getState();
    expect(cursorType).toBe('hover-social');
  });

  it('updates cursor type to hover-name', () => {
    const { setCursorType } = useUiStore.getState();
    setCursorType('hover-name');

    const { cursorType } = useUiStore.getState();
    expect(cursorType).toBe('hover-name');
  });

  it('resets cursor type to default', () => {
    const { setCursorType } = useUiStore.getState();

    setCursorType('hover');
    expect(useUiStore.getState().cursorType).toBe('hover');

    setCursorType('default');
    expect(useUiStore.getState().cursorType).toBe('default');
  });
});
