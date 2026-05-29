# Deployment Guide

G-Secure can be deployed on **Vercel** (recommended) or any Node.js-compatible host.

## Option 1: Deploy on Vercel (Recommended)

Vercel is the easiest option since G-Secure is a Next.js app.

### Steps

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **New Project**.
3. Import your `Gsecure` repository.
4. Set the **Root Directory** to `gsecure`.
5. Add all environment variables from your `.env.local` under **Environment Variables** in Vercel's dashboard.
6. Click **Deploy**.

Your app will be live at `https://your-project.vercel.app`.

### Required Environment Variables on Vercel
MONGODB_URI
JWT_SECRET
ENCRYPTION_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
NEXTAUTH_URL    

---

## Option 2: Manual Deployment (VPS / Server)

### Build the app

```bash
cd gsecure
npm install
npm run build
```

### Start the production server

```bash
npm run start
```

The app runs on port 3000 by default. Use **nginx** or **Apache** as a reverse proxy.

### Example nginx config

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## MongoDB Setup for Production

Use [MongoDB Atlas](https://www.mongodb.com/atlas) for production. Replace `MONGODB_URI` in your environment variables with your Atlas connection string:

