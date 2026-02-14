import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders correctly with default values', () => {
    render(<ProgressBar />);

    // Check if label is present
    expect(screen.getByText(/Jour 24\/30/i)).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    const currentDay = 10;
    render(<ProgressBar currentDay={currentDay} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', currentDay.toString());
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '30');
  });

  it('calculates width based on progress', () => {
    const currentDay = 15;
    render(<ProgressBar currentDay={currentDay} />);

    const progressbar = screen.getByRole('progressbar');
    const innerBar = progressbar.firstChild as HTMLElement;

    // 15/30 = 50%
    expect(innerBar.style.width).toBe('50%');
  });
});
