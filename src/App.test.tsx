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

    // First click - confirmation state
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm/i);
    expect(screen.getByRole('button', { name: /confirm delete project/i })).toBeInTheDocument();

    // Second click - actual delete
    fireEvent.click(button);

    // Check if button is disabled
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present (by checking if the delete icon is gone or checking content)
    // In our component, we switch the content.
    // The loading span has role="status" and aria-label="Deleting"
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('cancels confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // Click to enter confirmation state
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm/i);

    // Blur the button
    fireEvent.blur(button);

    // Should revert to initial state
    expect(button).not.toHaveTextContent(/confirm/i);
    expect(screen.getByRole('button', { name: /delete project/i })).toBeInTheDocument();
  });
});
