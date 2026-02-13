import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

const renderNotFound = () => {
  return render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
};

describe('NotFound Page', () => {
  it('should render 404 page with title', () => {
    renderNotFound();
    expect(screen.getByText('Page non trouvée')).toBeInTheDocument();
  });

  it('should render 404 code', () => {
    renderNotFound();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render error description', () => {
    renderNotFound();
    expect(screen.getByText(/la page que vous recherchez n'existe pas/i)).toBeInTheDocument();
  });

  it('should render back to home link', () => {
    renderNotFound();
    const link = screen.getByRole('link', { name: /Retourner à l'accueil/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should navigate to home when link is clicked', async () => {
    const user = userEvent.setup();
    renderNotFound();

    const homeLink = screen.getByRole('link', { name: /Retourner à l'accueil/i });
    expect(homeLink).toHaveAttribute('href', '/');

    await user.click(homeLink);
    // Link href should be intact for navigation
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
