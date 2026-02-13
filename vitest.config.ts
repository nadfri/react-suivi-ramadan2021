import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import path from 'path';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setup-tests.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: ['node_modules', 'dist', 'old/**'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'src/setup-tests.ts'],
      },
    },
    resolve: {
      alias: {
        'virtual:pwa-register/react': path.resolve(
          __dirname,
          './src/__mocks__/pwa-register-react.ts'
        ),
      },
    },
  })
);
