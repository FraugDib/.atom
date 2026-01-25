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

  it('shows loading state when deleting', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Request confirmation
    fireEvent.click(button);

    // Check for confirmation state
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent(/confirm/i);
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');

    // Second click: Confirm delete
    fireEvent.click(button);

    // Check if button is disabled and loading
    expect(button).toBeDisabled();
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Request confirmation
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm/i);

    // Blur the button
    fireEvent.blur(button);

    // Should reset to initial state
    expect(button).toHaveTextContent(/🗑️/);
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
