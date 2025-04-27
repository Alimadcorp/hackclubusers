// pages/api/cors-handler.js
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCKLZKLkE_tk08pGFPae6LQp04aCi6Ekzw",
    authDomain: "catstatus-a6168.firebaseapp.com",
    projectId: "catstatus-a6168",
    storageBucket: "catstatus-a6168.firebasestorage.app",
    messagingSenderId: "42492605742",
    appId: "1:42492605742:web:bf10ff3b37fa41324a76bf",
    measurementId: "G-TLEHM0GFGP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
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
