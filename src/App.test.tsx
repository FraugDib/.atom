import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('requires two clicks to delete and shows confirmation state', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation state
    fireEvent.click(button);

    // Check if label changed
    expect(button).toHaveAccessibleName(/confirm deletion/i);
    // Check if content changed to "Confirm?"
    expect(screen.getByText(/confirm\?/i)).toBeInTheDocument();
    // Should NOT be disabled yet
    expect(button).not.toBeDisabled();

    // Second click: Execute delete
    fireEvent.click(button);

    // Check if button is disabled (loading state)
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Enter confirmation state
    fireEvent.click(button);
    expect(screen.getByText(/confirm\?/i)).toBeInTheDocument();

    // Blur the button (simulate clicking away)
    fireEvent.blur(button);

    // Should revert to original state
    expect(button).toHaveAccessibleName(/delete project/i);
    expect(screen.queryByText(/confirm\?/i)).not.toBeInTheDocument();
  });
});
