// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add additional file extensions for Metro to process
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];

// Increase the max workers to improve bundling performance
config.maxWorkers = 8;

// Increase timeouts to prevent "Stream end encountered" errors
config.server = {
  ...config.server,
  port: 8081,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Extend timeout for all requests
      req.setTimeout(30000);
      middleware(req, res, next);
    };
  },
};

// Increase the WebSocket timeout
config.watcher = {
  ...config.watcher,
  healthCheck: {
    enabled: true,
    interval: 60000, // 60 seconds
    timeout: 30000, // 30 seconds
  },
};

module.exports = config; 