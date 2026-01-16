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

    // First click: Enter confirmation state
    fireEvent.click(button);

    // Check if text changed to "Confirm?" and accessible label updated
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Confirm delete');
    expect(button).not.toBeDisabled();

    // Second click: Trigger delete
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

    // First click: Enter confirmation state
    fireEvent.click(button);
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Blur event
    fireEvent.blur(button);

    // Should revert to delete icon
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
