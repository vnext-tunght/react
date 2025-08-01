# Environment Variables Guide

Tạo file `.env.local` trong root directory cho development environment:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=your-secret-key-here

# Features
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_MSW=false

# Analytics
VITE_GA_TRACKING_ID=
VITE_SENTRY_DSN=

# Other configurations
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_LANGUAGE=en
```

## Production Environment

```bash
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=super-secure-production-secret

# Features
VITE_ENABLE_DEVTOOLS=false
VITE_ENABLE_MSW=false

# Analytics
VITE_GA_TRACKING_ID=GA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxxxx

# Other configurations
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_LANGUAGE=en
```

## Environment Validation

Environment variables are validated automatically in production mode. The validation logic is located in `src/const/index.ts`.

Required variables for production:

- `VITE_API_BASE_URL`
- `VITE_JWT_SECRET`

## Usage in Code

```typescript
import { ENV } from '@const/index'

// Use environment variables
console.log(ENV.API_BASE_URL)
console.log(ENV.IS_PRODUCTION)
console.log(ENV.ENABLE_DEVTOOLS)
```
