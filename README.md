# React Base Project

A professional, production-ready React base project with TypeScript, Material-UI, React Query, and comprehenSee [IMPORT_ALIASES.md](./IMPORT_ALIASES.md) for complete documentation.

## 🌍 Internationalization (i18n)

The project includes full multi-language support:

- **English** and **Vietnamese** out of the box
- **Automatic language detection** from browser settings
- **Language switcher component** for easy switching
- **Dedicated hooks** for error and success messages

```typescript
// Use translations in components
import { useI18n } from "@hooks/common";

function MyComponent() {
  const { t } = useI18n();
  return <h1>{t("auth.login.title")}</h1>;
}

// Use pre-built message hooks
import { useErrorMessages, useSuccessMessages } from "@hooks/common";

function MyForm() {
  const errorMessages = useErrorMessages();
  // Use: errorMessages.networkError, errorMessages.validationError, etc.
}
```

See [I18N_GUIDE.md](./I18N_GUIDE.md) for complete documentation.

## 🔧 Configuratione development tools.

## 🚀 Features

### Core Technologies

- **React 19** + **TypeScript** - Latest React with full type safety
- **Vite** - Lightning fast build tool and dev server
- **Material-UI (MUI) v7** - Modern React component library
- **React Query (TanStack Query)** - Powerful data fetching and caching
- **React Router v7** - Client-side routing
- **React Hook Form + Zod** - Form handling with validation

### Architecture & Patterns

- **Axios Integration** - HTTP client with interceptors and automatic token management
- **Authentication System** - JWT-based auth with automatic token refresh
- **Internationalization (i18n)** - Multi-language support with react-i18next
- **Error Boundary** - Global error handling with graceful fallbacks
- **Loading States** - Comprehensive loading components and skeletons
- **Notifications** - Toast notifications with react-hot-toast
- **Type Safety** - Full TypeScript coverage with strict configuration

### Developer Experience

- **ESLint + TypeScript ESLint** - Code linting and formatting
- **Hot Module Replacement** - Fast development with instant updates
- **Environment Configuration** - Flexible env variable management
- **Utility Functions** - Common helpers for formatting, validation, etc.
- **React Query Devtools** - Debug and inspect queries in development
- **Import Aliases** - Clean imports with path aliases (@components, @pages, etc.)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (forms, loading, etc.)
│   └── layouts/         # Layout components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── providers/           # App-level providers (Query, Theme)
├── services/            # API services and HTTP client
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── const/               # Application constants
├── schemas/             # Zod validation schemas
└── theme/               # MUI theme configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or download this project**

   ```bash
   # If using git
   git clone <repository-url>
   cd react-base-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your API URL and other configurations
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript compiler check

## � Import Aliases

This project uses path aliases for cleaner imports:

```typescript
// Instead of relative paths
import { FormButton } from "../../components/common";
import { useAuth } from "../../../contexts/AuthContext";

// Use clean aliases
import { FormButton } from "@components/common";
import { useAuth } from "@contexts/AuthContext";
```

### Available Aliases

| Alias         | Path               | Description           |
| ------------- | ------------------ | --------------------- |
| `@`           | `./src`            | Root source directory |
| `@components` | `./src/components` | UI components         |
| `@pages`      | `./src/pages`      | Page components       |
| `@hooks`      | `./src/hooks`      | Custom React hooks    |
| `@services`   | `./src/services`   | API services          |
| `@utils`      | `./src/utils`      | Utility functions     |
| `@contexts`   | `./src/contexts`   | React contexts        |
| `@types`      | `./src/types`      | TypeScript types      |

See [IMPORT_ALIASES.md](./IMPORT_ALIASES.md) for complete documentation.

## �🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Your App Name
```

### API Integration

The project includes a fully configured HTTP client with:

- **Automatic token management** - JWT tokens stored in localStorage
- **Request/Response interceptors** - Auto-attach auth headers
- **Token refresh** - Automatic token renewal on expiry
- **Error handling** - Standardized error responses

Example API usage:

```typescript
// In your components
import { useLogin, useCurrentUser } from "../hooks/useApiAuth";

function LoginForm() {
  const loginMutation = useLogin();
  const { data: user, isLoading } = useCurrentUser();

  const handleLogin = async (credentials) => {
    await loginMutation.mutateAsync(credentials);
    // User automatically logged in, tokens stored
  };
}
```

### Adding New API Endpoints

1. **Add API functions** in `src/services/api.ts`:

   ```typescript
   export const postsApi = {
     getPosts: async (): Promise<Post[]> => {
       const response = await apiClient.get<Post[]>("/posts");
       return response.data;
     },
   };
   ```

2. **Create custom hooks** in `src/hooks/`:
   ```typescript
   export const usePosts = () => {
     return useQuery({
       queryKey: ["posts"],
       queryFn: () => postsApi.getPosts(),
     });
   };
   ```

## 🎨 Customization

### Theme

Modify `src/theme/index.ts` to customize Material-UI theme:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: "#your-color",
    },
  },
});
```

### Constants

Update `src/const/index.ts` for app-wide constants:

```typescript
export const APP_CONFIG = {
  API_TIMEOUT: 10000,
  CACHE_TIME: {
    SHORT: 5 * 60 * 1000,
  },
};
```

## 🧪 Built-in Utilities

### Notifications

```typescript
import { notifications } from "../utils/notifications";

notifications.success("Success message");
notifications.error("Error message");
notifications.promise(apiCall, {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});
```

### Validation

```typescript
import { isValidEmail, getPasswordStrength } from "../utils/validation";

const isValid = isValidEmail("user@example.com");
const strength = getPasswordStrength("password123");
```

### Formatting

```typescript
import { formatDate, formatCurrency, truncateText } from "../utils";

const date = formatDate(new Date());
const price = formatCurrency(1234.56);
const excerpt = truncateText("Long text...", 100);
```

## 🏗️ Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📦 Key Dependencies

- `react` - UI library
- `@mui/material` - UI components
- `@tanstack/react-query` - Data fetching
- `axios` - HTTP client
- `react-router-dom` - Routing
- `react-hook-form` - Forms
- `zod` - Validation
- `react-hot-toast` - Notifications
