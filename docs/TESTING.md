# Testing Guide

## Overview

Dự án sử dụng **Vitest** cho unit testing và **Testing Library** cho component testing.

## Test Structure

```
src/
├── components/
│   └── __tests__/
│       └── ComponentName.test.tsx
├── hooks/
│   └── __tests__/
│       └── hookName.test.ts
├── utils/
│   └── __tests__/
│       └── utilName.test.ts
└── test/
    ├── setup.ts
    └── mocks/
        └── server.ts
```

## Writing Tests

### Component Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

### Hook Tests

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe('expected')
  })
})
```

### API Mocking

MSW (Mock Service Worker) được sử dụng để mock API calls:

```typescript
// src/test/mocks/server.ts
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([{ id: 1, name: 'John Doe' }])
  }),
]

export const server = setupServer(...handlers)
```

## Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Configuration

Tests are configured in `vitest.config.ts` with:

- Global test setup
- DOM environment (jsdom)
- Coverage reporting
- Custom test matchers

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the user sees and does
   - Avoid testing internal state

2. **Use Descriptive Test Names**

   ```typescript
   it('shows error message when email is invalid', () => {
     // test implementation
   })
   ```

3. **Arrange, Act, Assert**

   ```typescript
   it('submits form with valid data', () => {
     // Arrange
     render(<LoginForm />)

     // Act
     fireEvent.change(screen.getByLabelText('Email'), {
       target: { value: 'test@example.com' }
     })
     fireEvent.click(screen.getByText('Submit'))

     // Assert
     expect(submitMock).toHaveBeenCalledWith({
       email: 'test@example.com'
     })
   })
   ```

4. **Mock External Dependencies**
   - Mock API calls with MSW
   - Mock browser APIs (localStorage, etc.)
   - Mock third-party libraries

5. **Test Accessibility**
   ```typescript
   it('is accessible', () => {
     render(<MyComponent />)
     expect(screen.getByRole('button')).toBeInTheDocument()
   })
   ```
