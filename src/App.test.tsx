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

  it('requires two steps to delete', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation mode
    fireEvent.click(button);

    // Check if button text changed to "Confirm?" and aria-label updated
    const confirmButton = screen.getByRole('button', { name: /confirm delete/i });
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toHaveTextContent(/confirm/i);
    expect(confirmButton).not.toBeDisabled();

    // Second click: Trigger delete
    fireEvent.click(confirmButton);

    // Check if button is disabled and showing spinner
    expect(confirmButton).toBeDisabled();
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation mode
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();

    // Blur the button
    fireEvent.blur(button);

    // Should reset to initial state
    expect(screen.getByRole('button', { name: /delete project/i })).toBeInTheDocument();
  });
});
