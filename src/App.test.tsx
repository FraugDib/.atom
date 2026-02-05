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

    // First click: enters confirmation state
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Confirm deletion');

    // Check loading has NOT started
    expect(screen.queryByRole('status', { name: /deleting/i })).not.toBeInTheDocument();

    // Second click: starts deleting
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(screen.getByRole('status', { name: /deleting/i })).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // Click to confirm
    fireEvent.click(button);
    expect(screen.getByText('Confirm?')).toBeInTheDocument();

    // Blur
    fireEvent.blur(button);
    expect(screen.queryByText('Confirm?')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
