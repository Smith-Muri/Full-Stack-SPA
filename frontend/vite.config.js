import { defineConfig } from 'vite';
// use esbuild for JSX to avoid plugin-react issues

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  plugins: [
    // small plugin to redirect root to index.html
    {
      name: 'spa-root-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '') {
            res.writeHead(302, { Location: '/index.html' });
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ],
  server: {
    // avoid clashes with backend (3001) or any other service
    port: 3002,
    open: '/index.html',
  },
});
