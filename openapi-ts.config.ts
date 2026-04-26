import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: './docs/swagger.json',
  },
  output: 'src/api/generated',
  plugins: ['@hey-api/client-axios'],
});
