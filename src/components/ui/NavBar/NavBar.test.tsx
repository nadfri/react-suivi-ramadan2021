import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('NavBar Component', () => {
  it('should render all navigation links', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText('Calendrier')).toBeInTheDocument();
    expect(screen.getByText('Statistiques')).toBeInTheDocument();
    expect(screen.getByText('Historique')).toBeInTheDocument();
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('should render navigation element', () => {
    const { container } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav.NavBar');
    expect(nav).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/graph');
    expect(links[2]).toHaveAttribute('href', '/history');
    expect(links[3]).toHaveAttribute('href', '/settings');
  });
});
