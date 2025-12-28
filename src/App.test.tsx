import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

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
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('shows success state after deleting', () => {
    vi.useFakeTimers();
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    fireEvent.click(button);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Check for success state
    // Expect the button to show "Deleted" and be disabled
    // The button might still be the same element, but content changed
    // We search for "Deleted" text which should now be visible
    const successText = screen.getByText(/deleted/i);
    expect(successText).toBeInTheDocument();

    // Ensure button is still disabled (or maybe enabled but useless? Disabled is better for "Deleted")
    expect(button).toBeDisabled();

    vi.useRealTimers();
  });
});
