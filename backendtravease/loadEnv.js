// Imported first by server.js. ES module imports are evaluated before any
// statement in the importing file, so dotenv.config() must live in its own
// module that is imported ahead of everything else — otherwise modules that
// read process.env at import time (mailer, Stripe) see undefined.
import dotenv from 'dotenv';
dotenv.config();
