import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimatedText from './AnimatedText';

describe('AnimatedText', () => {
  it('renders the text correctly', () => {
    render(<AnimatedText text="test" index={0} setActiveIndex={vi.fn()} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('calls setActiveIndex on mouse enter', async () => {
    const setActiveIndex = vi.fn();
    const user = userEvent.setup();

    render(<AnimatedText text="test" index={0} setActiveIndex={setActiveIndex} />);

    const element = screen.getByText('test');
    await user.hover(element);

    expect(setActiveIndex).toHaveBeenCalledWith(0);
  });

  it('resets active index on mouse leave', async () => {
    const setActiveIndex = vi.fn();
    const user = userEvent.setup();

    render(<AnimatedText text="test" index={0} setActiveIndex={setActiveIndex} />);

    const element = screen.getByText('test');
    await user.hover(element);
    await user.unhover(element);

    expect(setActiveIndex).toHaveBeenCalledWith(-1);
  });

  it('applies CSS module class', () => {
    render(<AnimatedText text="test" index={0} setActiveIndex={vi.fn()} />);
    const element = screen.getByText('test');
    // CSS modules create hashed class names, so we just check it has a className
    expect(element.className).toBeTruthy();
  });
});
