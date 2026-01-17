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

    // First click: confirmation
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(button).toHaveAccessibleName(/confirm delete/i);

    // Second click: actual delete
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

    // Click to show confirmation
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Blur the button
    fireEvent.blur(button);

    // Should revert to original state
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    expect(button).toHaveAccessibleName(/delete project/i);
  });
});
