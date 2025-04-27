// pages/api/cors-handler.js

import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'X-Custom-Integer'], // Allow 'X-Custom-Integer' header
});

// Helper function to run middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  // Parse the custom integer header (X-Custom-Integer)
  const customIntegerHeader = req.headers['x-custom-integer'];

  if (!customIntegerHeader) {
    return res.status(400).json({ error: 'Missing custom integer header' });
  }

  const parsedInteger = parseInt(customIntegerHeader, 10);

  if (isNaN(parsedInteger)) {
    return res.status(400).json({ error: 'Invalid integer header' });
  }

  // Send a response with the custom integer
  return res.status(200).json({
    message: 'Successfully processed custom integer header',
    customInteger: parsedInteger,
  });
}
