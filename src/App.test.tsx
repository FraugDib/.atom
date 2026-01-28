import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders email input with accessible label', () => {
    render(<App />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
  });

  it('renders delete button with accessible name', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    expect(button).toBeInTheDocument();
  });

  it('shows confirmation state on first click', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    fireEvent.click(button);

    // Check if text changed to Confirm?
    expect(screen.getByText('Confirm?')).toBeInTheDocument();
    // Check if ARIA label updated
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    fireEvent.click(button);

    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    fireEvent.blur(button);

    // Should revert to original state
    expect(screen.queryByText('Confirm?')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });

  it('shows loading state when deleting (confirmed)', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click -> Confirm
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Second click -> Delete
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });
});
