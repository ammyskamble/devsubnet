import { dev } from "astro";
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '../');

console.log("Starting Astro dev server programmatically at:", projectRoot);

let devServer;

try {
  devServer = await dev({
    root: projectRoot,
    server: {
      port: 4321,
      host: "127.0.0.1"
    }
  });

  console.log("Astro dev server started programmatically on port 4321!");
  console.log("Watcher status:", !!devServer.watcher);
} catch (err) {
  console.error("Failed to start Astro dev server programmatically:", err);
  process.exit(1);
}

// Graceful cleanup on shutdown signals
const shutdown = async () => {
  console.log("Shutdown signal received. Stopping dev server...");
  if (devServer && typeof devServer.stop === 'function') {
    try {
      await devServer.stop();
    } catch (e) {
      console.error("Error stopping dev server:", e);
    }
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep the Node.js process alive
const heartbeat = setInterval(() => {
  console.log("Dev server heartbeat - process running.");
}, 60000);
