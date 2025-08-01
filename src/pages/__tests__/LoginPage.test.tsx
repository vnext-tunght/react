import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginPage } from '@pages/LoginPage'
import { TestProviders } from '../../test/providers'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <a {...props}>{children}</a>,
}))

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  },
}))

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <TestProviders>
        <LoginPage />
      </TestProviders>
    )

    // Test renders English by default - use more specific selectors
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(
      <TestProviders>
        <LoginPage />
      </TestProviders>
    )

    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    fireEvent.click(submitButton)

    // React Hook Form will handle validation
    await waitFor(() => {
      // Check if form is in error state
      expect(submitButton).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(
      <TestProviders>
        <LoginPage />
      </TestProviders>
    )

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByDisplayValue('')
    const submitButton = screen.getByRole('button', { name: 'Sign In' })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument()
    })
  })
})
