import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormButton } from '@components/common/FormButton'

describe('FormButton', () => {
  it('renders with text', () => {
    render(<FormButton>Click me</FormButton>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<FormButton loading>Submit</FormButton>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<FormButton disabled>Submit</FormButton>)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant styles correctly', () => {
    render(<FormButton variant="outlined">Submit</FormButton>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('MuiButton-outlined')
  })

  it('handles fullWidth prop', () => {
    render(<FormButton fullWidth>Submit</FormButton>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('MuiButton-fullWidth')
  })
})
