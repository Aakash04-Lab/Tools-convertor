import app, { ensureDBConnection } from '../server/src/server.js';

export default async function handler(req, res) {
  try {
    await ensureDBConnection();
    return app(req, res);
  } catch (error) {
    console.error('API startup failed:', error);
    return res.status(500).json({
      message: 'API startup failed',
      error: process.env.NODE_ENV === 'production' ? 'Server configuration error' : error.message
    });
  }
}
