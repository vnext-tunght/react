import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema } from '../auth.schema'

describe('auth schemas', () => {
  describe('loginSchema', () => {
    it('validates a correct login', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects missing email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'not-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: '12345',
      })
      expect(result.success).toBe(false)
    })

    it('rejects empty password', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      country: 'US',
      password: 'Password1',
      confirmPassword: 'Password1',
    }

    it('validates correct registration data', () => {
      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects short first name', () => {
      const result = registerSchema.safeParse({ ...validData, firstName: 'J' })
      expect(result.success).toBe(false)
    })

    it('rejects short last name', () => {
      const result = registerSchema.safeParse({ ...validData, lastName: 'D' })
      expect(result.success).toBe(false)
    })

    it('rejects invalid email', () => {
      const result = registerSchema.safeParse({
        ...validData,
        email: 'invalid',
      })
      expect(result.success).toBe(false)
    })

    it('rejects empty country', () => {
      const result = registerSchema.safeParse({ ...validData, country: '' })
      expect(result.success).toBe(false)
    })

    it('rejects password without uppercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'password1',
        confirmPassword: 'password1',
      })
      expect(result.success).toBe(false)
    })

    it('rejects password without digit', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: 'Password',
        confirmPassword: 'Password',
      })
      expect(result.success).toBe(false)
    })

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        ...validData,
        confirmPassword: 'DifferentPass1',
      })
      expect(result.success).toBe(false)
    })
  })
})
