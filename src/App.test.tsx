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

  it('shows loading state when deleting after confirmation', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Request confirmation
    fireEvent.click(button);
    expect(button).not.toBeDisabled();
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Confirm deletion');

    // Second click: Confirm and delete
    fireEvent.click(button);
    expect(button).toBeDisabled();

    // The loading span has role="status" and aria-label="Deleting"
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Request confirmation
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Blur the button (click elsewhere or tab away)
    fireEvent.blur(button);

    // Should reset to initial state (Trash icon present, "Confirm?" gone)
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
