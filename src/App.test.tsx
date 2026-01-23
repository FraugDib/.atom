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

    // Should now show confirmation
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Should not be deleting yet
    expect(button).not.toBeDisabled();
    expect(screen.queryByRole('status', { name: /deleting/i })).not.toBeInTheDocument();

    // Second click
    fireEvent.click(button);

    // Now should be deleting
    expect(button).toBeDisabled();
    expect(screen.getByRole('status', { name: /deleting/i })).toBeInTheDocument();
  });

  it('resets confirmation on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click
    fireEvent.click(button);

    // Should now show confirmation
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Blur
    fireEvent.blur(button);

    // Should reset to initial state
    expect(screen.getByRole('button', { name: /delete project/i })).toBeInTheDocument();
    expect(screen.queryByText('Confirm?')).not.toBeInTheDocument();
  });
});
