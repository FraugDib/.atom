import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('requires two clicks to delete (two-step confirmation)', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation state
    fireEvent.click(button);

    // Verify confirmation state
    // Button text should change to "Confirm?" or similar
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    // Button should NOT be disabled yet
    expect(button).not.toBeDisabled();
    // Aria label should update
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');

    // Second click: Execute delete
    fireEvent.click(button);

    // Now it should be disabled and showing loading
    expect(button).toBeDisabled();
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation state
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Blur the button (user clicks away)
    fireEvent.blur(button);

    // Should reset to original state
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
