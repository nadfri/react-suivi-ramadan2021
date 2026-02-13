import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { formatHijri, getHijriToday } from '@misque/hijri';

describe('Header Component', () => {
  it('should render hijri date', () => {
    render(<Header />);

    const hijriDate = formatHijri(getHijriToday());
    expect(screen.getByText(hijriDate)).toBeInTheDocument();
  });

  it('should render local date in french', () => {
    render(<Header />);

    const today = new Date();
    const localDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    expect(screen.getByText(localDate)).toBeInTheDocument();
  });

  it('should render header element', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should display hijri date in larger text', () => {
    const { container } = render(<Header />);

    const hijriDate = formatHijri(getHijriToday());
    const largeTextDiv = container.querySelector('.text-2xl');

    expect(largeTextDiv).toBeInTheDocument();
    expect(largeTextDiv).toHaveTextContent(hijriDate);
  });

  it('should display local date in smaller text', () => {
    const { container } = render(<Header />);

    const today = new Date();
    const localDate = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const smallTextDiv = container.querySelector('.text-xs');

    expect(smallTextDiv).toBeInTheDocument();
    expect(smallTextDiv).toHaveTextContent(localDate);
  });
});
