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

  it('requires confirmation before deleting', () => {
    vi.useFakeTimers();
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation mode
    fireEvent.click(button);

    // Check if label changed
    expect(button).toHaveAttribute('aria-label', 'Confirm deletion');
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Button should not be disabled yet
    expect(button).not.toBeDisabled();

    // Second click: Actually delete
    fireEvent.click(button);

    // Now it should be loading
    expect(button).toBeDisabled();
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('auto-cancels confirmation after timeout', () => {
    vi.useFakeTimers();
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // Click to confirm
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Fast-forward time (3s)
    act(() => {
        vi.advanceTimersByTime(3000);
    });

    // Should revert to original state
    expect(button).toHaveAttribute('aria-label', 'Delete project');
    expect(screen.queryByText('Confirm?')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
