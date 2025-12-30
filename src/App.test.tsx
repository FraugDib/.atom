import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders email input with accessible label', () => {
    render(<App />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('placeholder', 'user@example.com');
  });

  it('renders delete button with accessible name', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    expect(button).toBeInTheDocument();
  });

  it('shows loading state and then success state when deleting', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /delete project/i });
    fireEvent.click(button);

    // Check if button is disabled and showing loading state
    expect(button).toBeDisabled();
    const spinner = screen.getByRole('status', { name: /deleting/i });
    expect(spinner).toBeInTheDocument();

    // Wait for the success state (2 seconds timeout in component)
    await waitFor(() => {
        const successButton = screen.getByRole('button', { name: /project deleted/i });
        expect(successButton).toBeInTheDocument();
        expect(successButton).toBeDisabled();
        expect(screen.getByText('✅')).toBeInTheDocument();
    }, { timeout: 2500 });
  });
});
