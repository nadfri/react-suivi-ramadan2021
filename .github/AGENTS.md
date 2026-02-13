# Agent Directives

**For AI agents only. Use Context7 for up-to-date library documentation.**

## Rules

- `type` only (NO `interface`)
- NO `any` type
- NO unused variables (except `_` prefix)
- NO non-null assertion (`!`)
- English comments only
- NO `useMemo` or `useCallback` → React Compiler handles memoization
- Only export components from component files
- Ignore `old/` folder completely

## Stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19.2.0 | Vite + PWA |
| TypeScript | ~5.9.3 | Strict mode |
| Vitest | 4.0.18 | jsdom, globals:true |
| RTL | 16.3.2 | with jest-dom |
| Tailwind | 4.1.18 | @tailwindcss/postcss v4 |
| Firebase | 12.9.0 | with react-firebase-hooks |
| ESLint | 9.37.0 | strict + stylistic |
| Prettier | 3.8.1 | 100 width, 2 spaces, single quotes |
| React Compiler | 1.0.0 | babel plugin |

## Commands

```bash
pnpm dev              # Development
pnpm build            # Build (runs tsc + lint)
pnpm lint / lint:fix  # ESLint check/fix
pnpm format           # Prettier format
pnpm test / test:ui   # Vitest + UI
```

## Key Files

- `eslint.config.js` - Flat config, ignores: dist, node_modules, old/**
- `prettier.rc.json` - 100 width, 2 spaces, single quotes
- `tailwind.config.js` - v4 config (no content paths needed)
- `.env.local` - Firebase keys (VITE_FIREBASE_*)
- `babel.config.js` - React Compiler plugin
- `vitest.config.ts` - jsdom environment

## Firebase

- Config: `src/config/firebase.ts`
- Provider: `src/context/AuthContext.tsx` with `useAuth` hook
- Returns: `{ user, loading, error }`

## React Compiler

- Plugin: `babel-plugin-react-compiler`
- Automatic memoization: NO manual `useMemo` or `useCallback`
- Write natural code, compiler optimizes
- ESLint validates dependencies via react-hooks plugin

## Testing

- Test files: `*.test.tsx` next to source
- Setup: `src/setup-tests.ts`
- Mock Firebase with `vi.mock()`
- Use Testing Library conventions

## Context7 Documentation

For up-to-date library docs, use:

```
/facebook/react                    - React docs
/facebook/react/blob/main/compiler - React Compiler
/vitest-dev/vitest                 - Vitest docs
/testing-library/testing-library   - RTL docs
/tailwindlabs/tailwindcss.com      - Tailwind docs
/firebase/firebase-js-sdk          - Firebase docs
```

Query format: `mcp_context7_query-docs` with library ID.

## ESLint Rules

| Rule | Level | 
|------|-------|
| no-explicit-any | error |
| consistent-type-definitions | error |
| no-unused-vars | error |
| no-non-null-assertion | error |
| react-refresh/only-export-components | warn |

Disable exceptions: `// eslint-disable-next-line rule-name`

## Build Pipeline

1. TypeScript compilation
2. ESLint validation
3. React Compiler optimizations (Babel)
4. Vite build → `dist/`

Done.

