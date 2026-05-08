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

server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}`);
  try {
    await preRenderSite({
      startingUrl: `http://localhost:${PORT}`,
      outputDir: DIST,
    });
    console.log('Prerendering complete.');
  } catch (err) {
    console.error('Prerender error:', err.message);
    process.exit(1);
  } finally {
    server.close();
  }
});
