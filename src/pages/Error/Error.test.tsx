import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Error from './Error';

const renderError = (props = {}) => {
  return render(
    <BrowserRouter>
      <Error {...props} />
    </BrowserRouter>
  );
};

describe('Error Page', () => {
  it('should render error page with title', () => {
    renderError();
    expect(screen.getByText("Oups! Une erreur s'est produite")).toBeInTheDocument();
  });

  it('should render action buttons', () => {
    renderError();
    expect(screen.getByRole('button', { name: /Retourner à l'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Recharger la page/i })).toBeInTheDocument();
  });

  it('should call onReset when go home button is clicked', async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();
    renderError({ onReset });

    const goHomeBtn = screen.getByRole('button', { name: /Retourner à l'accueil/i });
    await user.click(goHomeBtn);

    expect(onReset).toHaveBeenCalled();
  });

  it('should reload page when reload button is clicked', async () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => undefined);
    const user = userEvent.setup();
    renderError();

    const reloadBtn = screen.getByRole('button', { name: /Recharger la page/i });
    await user.click(reloadBtn);

    expect(reloadSpy).toHaveBeenCalled();
    reloadSpy.mockRestore();
  });
});
