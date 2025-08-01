import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock auth endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
    })
  }),

  http.post('/api/auth/refresh', () => {
    return HttpResponse.json({
      token: 'new-mock-jwt-token',
    })
  }),

  http.get('/api/user/profile', () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    })
  }),
]

export const server = setupServer(...handlers)
