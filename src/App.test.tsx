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

    // First click: triggers confirmation state
    fireEvent.click(button);

    // Check if button text changed to "Confirm?"
    expect(button).toHaveTextContent(/confirm\?/i);
    expect(button).toHaveAccessibleName(/confirm delete project/i);

    // Second click: triggers deletion
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

    // First click: triggers confirmation state
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm\?/i);

    // Blur the button
    fireEvent.blur(button);

    // Should reset to original state
    expect(button).not.toHaveTextContent(/confirm\?/i);
    expect(button).toHaveAccessibleName(/delete project/i);
  });
});
