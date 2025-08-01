import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Start mock server before all tests
beforeAll(() => server.listen())

// Clean up after each test
afterEach(() => {
  cleanup()
  server.resetHandlers()
})

// Close mock server after all tests
afterAll(() => server.close())
