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

  it('requires two clicks to delete and shows loading state', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });

    // First click: Confirm state
    fireEvent.click(button);

    // Button content should change to "Confirm?"
    expect(screen.getByText(/confirm\?/i)).toBeInTheDocument();
    // Aria label should update
    expect(button).toHaveAttribute('aria-label', 'Confirm delete project');

    // Second click: Delete state
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

    // First click: Enter confirm state
    fireEvent.click(button);
    expect(screen.getByText(/confirm\?/i)).toBeInTheDocument();

    // Blur event (simulating clicking outside or tabbing away)
    fireEvent.blur(button);

    // Should revert to original state
    expect(screen.queryByText(/confirm\?/i)).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Delete project');
  });
});
