import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomLink from './CustomLink';

// Mock Zustand store
vi.mock('../../stores/cursor.store', () => ({
  useUiStore: () => ({
    setCursorType: vi.fn(),
  }),
}));

describe('CustomLink', () => {
  it('renders button type correctly', () => {
    render(<CustomLink type="button" url="" text="Click me" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders internal link correctly', () => {
    render(<CustomLink type="internal" url="/about" text="About" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders external link with correct href', () => {
    render(<CustomLink type="link" url="https://example.com" text="External" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('External');
  });

  it('renders download link with download attribute', () => {
    render(<CustomLink type="link" url="/file.pdf" text="Download" download />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('download');
  });
});
