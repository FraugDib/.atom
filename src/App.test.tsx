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

  it('shows loading state when deleting after confirmation', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: enters confirmation state
    fireEvent.click(button);
    expect(button).toHaveTextContent(/confirm/i);
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');
    expect(button).not.toBeDisabled();

    // Second click: starts deleting
    fireEvent.click(button);
    expect(button).toBeDisabled();

    // Check if spinner/loading indicator is present
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();
  });

  it('resets confirmation state on blur', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: enters confirmation state
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');

    // Blur: resets state
    fireEvent.blur(button);
    expect(button).toHaveAttribute('aria-label', 'Delete project');
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
  });
});
