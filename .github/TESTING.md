# Testing Guide

## Setup

The project uses **Vitest** and **React Testing Library** for unit and component testing.

### Installed packages
- `vitest` - Lightning-fast unit testing framework
- `@vitest/ui` - UI dashboard for test results
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Custom matchers for DOM elements
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM implementation for Node.js

## Commands

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI dashboard
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

## File Structure

Test files should be placed next to the component they test:

```
src/
├── components/
│   ├── MyComponent.tsx
│   └── MyComponent.test.tsx      # Test file
├── context/
│   ├── AuthContext.tsx
│   └── AuthContext.test.tsx      # Test file
└── setup-tests.ts                 # Global setup
```

## Writing Tests

### Basic Component Test

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

### Testing with User Interactions

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Testing Hooks

```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(0);
  });

  it('should update state', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.increment();
    });

    await waitFor(() => {
      expect(result.current.value).toBe(1);
    });
  });
});
```

### Testing with Providers (Context, Redux, etc.)

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthProvider } from './AuthContext';
import ProtectedComponent from './ProtectedComponent';

describe('ProtectedComponent with AuthProvider', () => {
  it('should render with auth provider', () => {
    render(
      <AuthProvider>
        <ProtectedComponent />
      </AuthProvider>
    );
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });
});
```

## Common Matchers

```tsx
// Existence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();

// Text content
expect(screen.getByText('text')).toBeInTheDocument();
expect(element).toHaveTextContent('text');

// Attributes
expect(element).toHaveAttribute('href', '/path');
expect(element).toHaveClass('active');

// Disabled state
expect(button).toBeDisabled();
expect(button).not.toBeDisabled();

// Form elements
expect(input).toHaveValue('text');
expect(input).toHaveFocus();
```

## Testing Async Code

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Async component', () => {
  it('should load data', async () => {
    render(<DataFetcher />);
    
    // Wait for element to appear
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument();
    });
  });
});
```

## Best Practices

1. **Test behavior, not implementation**
   - Focus on what users see and do
   - Avoid testing internal state directly

2. **Use semantic queries**
   ```tsx
   // ✅ GOOD
   screen.getByRole('button', { name: /submit/i });
   screen.getByLabelText('Username');
   
   // ❌ AVOID
   screen.getByTestId('my-button');
   wrapper.find('.my-class');
   ```

3. **Keep tests focused**
   - One behavior per test
   - Clear, descriptive test names

4. **Mock external dependencies**
   ```tsx
   vi.mock('../api', () => ({
     fetchUser: vi.fn(() => Promise.resolve({ id: 1 })),
   }));
   ```

5. **Use fixtures for complex setup**
   ```tsx
   const renderWithProviders = (component: ReactNode) => {
     return render(
       <AuthProvider>
         <ThemeProvider>
           {component}
         </ThemeProvider>
       </AuthProvider>
     );
   };
   ```

## Configuration Files

- `vitest.config.ts` - Vitest configuration
- `src/setup-tests.ts` - Global test setup

## Coverage Thresholds

Run `pnpm test:coverage` to generate a coverage report. Current configuration:
- Excludes node_modules and setup-tests.ts
- Reports in text, JSON, and HTML formats

## Resources

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
