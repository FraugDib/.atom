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

    // Check if button text changes to "Confirm?"
    expect(button).toHaveTextContent(/confirm/i);
    // Check if aria-label changes
    expect(button).toHaveAttribute('aria-label', 'Confirm deletion');
    // Button should NOT be disabled yet
    expect(button).not.toBeDisabled();
  });

  it('shows loading state when deleting (after confirmation)', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation mode
    fireEvent.click(button);

    // Second click: Confirm delete
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // Enter confirmation mode
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm/i);

    // Blur the button
    fireEvent.blur(button);

    // Should reset to original state
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
