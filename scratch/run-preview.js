import { preview } from "astro";
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '../');

console.log("Starting Astro preview server programmatically at:", projectRoot);

let previewServer;

try {
  previewServer = await preview({
    root: projectRoot,
    server: {
      port: 4321,
      host: "127.0.0.1"
    }
  });

  console.log("Astro preview server started programmatically on port 4321!");
} catch (err) {
  console.error("Failed to start Astro preview server programmatically:", err);
  process.exit(1);
}

// Graceful cleanup on shutdown signals
const shutdown = async () => {
  console.log("Shutdown signal received. Stopping preview server...");
  if (previewServer && typeof previewServer.stop === 'function') {
    try {
      await previewServer.stop();
    } catch (e) {
      console.error("Error stopping preview server:", e);
    }
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep the Node.js process alive
const heartbeat = setInterval(() => {
  console.log("Preview server heartbeat - process running.");
}, 60000);
