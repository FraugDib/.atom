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

    // Should show "Confirm?"
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Should have updated aria-label
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');

    // Should NOT be disabled or loading yet
    expect(button).not.toBeDisabled();
    expect(screen.queryByRole('status', { name: /deleting/i })).not.toBeInTheDocument();
  });

  it('resets confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Blur
    fireEvent.blur(button);

    // Should reset to original state
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });

  it('shows loading state when deleting', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // Click 1: Confirm
    fireEvent.click(button);

    // Click 2: Delete
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present (by checking if the delete icon is gone or checking content)
    // In our component, we switch the content.
    // The loading span has role="status" and aria-label="Deleting"
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });
});
