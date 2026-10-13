# Trav-Ease — setup

MERN app. React frontend (Create React App) + Express/Mongoose backend.

## Run locally

**Backend**

    cd backendtravease
    cp .env.example .env     # then fill in the real values
    npm install
    npm start                # http://localhost:8001

**Frontend**

    cd frontend
    cp .env.example .env
    npm install
    npm start                # http://localhost:3000

## Environment variables

**backendtravease/.env**

| Key | What it is |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` while testing) |
| `EMAIL_USER` / `EMAIL_PASS` | Gmail address + 16-character app password |
| `PORT` | Defaults to 8001. Hosting platforms set this themselves. |
| `CORS_ORIGIN` | Comma-separated list of allowed frontend origins |
| `NODE_ENV` | `production` on a deployed server — hides stack traces from API responses |

**frontend/.env**

| Key | What it is |
|---|---|
| `REACT_APP_API_URL` | Backend base URL. Local: `http://localhost:8001`. In Vercel: your deployed backend URL. |

## Notes

- `.env` is gitignored in both folders. Never commit it.
- `backendtravease/uploads/` is gitignored — user uploads are runtime data, not source.
  Local disk does not survive a redeploy on hosted platforms, so these move to
  object storage (Supabase Storage) before going live.
