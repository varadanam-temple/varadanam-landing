import pkg from 'prerender-spa-ultra';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { resolve, extname, join } from 'path';

const { preRenderSite } = pkg;

const DIST = resolve('./dist');
const PORT = 14321;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

// Simple static server with SPA fallback
const server = createServer((req, res) => {
  let filePath = join(DIST, req.url.split('?')[0]);
  if (!extname(filePath) || !existsSync(filePath)) {
    filePath = join(DIST, 'index.html');
  }
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'text/plain' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

// All entry points to ensure full crawl coverage
// preRenderSite crawls links found on each page, so starting from
// both / and /temple-history ensures all routes are discovered.
const STARTING_URLS = [
  `http://localhost:${PORT}/`,
  `http://localhost:${PORT}/blog`,
  `http://localhost:${PORT}/temple-history`,
  `http://localhost:${PORT}/our-story`,
];

server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  try {
    let totalRendered = 0;
    const BASE = `http://localhost:${PORT}`;
    for (const startingUrl of STARTING_URLS) {
      const visited = await preRenderSite({
        startingUrl,
        baseUrl: BASE,
        outputDir: DIST,
        selectorToWaitFor: 'nav',
      });
      totalRendered += visited.length;
      console.log(`  ${startingUrl} → ${visited.length} pages`);
    }
    console.log(`Prerendering complete. Total: ${totalRendered} pages rendered.`);
  } catch (err) {
    console.error('Prerender error:', err.message);
    process.exit(1);
  } finally {
    server.close();
  }
});
