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

    // First click - Confirmation
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Second click - Action
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

    // Click to show confirmation
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Blur
    fireEvent.blur(button);
    expect(screen.queryByText('Confirm?')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/delete project/i)).toBeInTheDocument();
  });
});
