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

  it('requires confirmation before deleting', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click
    fireEvent.click(button);

    // Should show confirmation text
    expect(screen.getByText("Confirm?")).toBeInTheDocument();
    // Should have new aria-label
    expect(button).toHaveAttribute('aria-label', 'Confirm deletion');
    // Should NOT be disabled yet
    expect(button).not.toBeDisabled();
    // Should NOT show spinner
    expect(screen.queryByRole('status', { name: /deleting/i })).not.toBeInTheDocument();
  });

  it('shows loading state when confirmed', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Ask for confirmation
    fireEvent.click(button);
    expect(screen.getByText("Confirm?")).toBeInTheDocument();

    // Second click: Actually delete
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click
    fireEvent.click(button);
    expect(screen.getByText("Confirm?")).toBeInTheDocument();

    // Blur
    fireEvent.blur(button);

    // Should reset to original state
    expect(screen.queryByText("Confirm?")).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
