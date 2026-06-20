# Installation Guide

This guide walks you through setting up G-Secure locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- [Git](https://git-scm.com/)

## 1. Clone the Repository

```bash
git clone https://github.com/HarshYadav152/Gsecure.git
cd Gsecure
```

## 2. Navigate to the App Directory

```bash
cd gsecure
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and configure the following:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/gsecure

# JWT secret key (use a long random string)
JWT_SECRET=your_jwt_secret_here

# AES encryption key (32 characters)
ENCRYPTION_KEY=your_32_char_encryption_key_here

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth credentials
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# App URL
NEXTAUTH_URL=http://localhost:3000
```

## 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `MONGODB_URI` connection error | Make sure MongoDB is running locally or your Atlas URI is correct |
| OAuth not working | Double-check your Google/GitHub client credentials in `.env.local` |
| Port 3000 in use | Run `npm run dev -- -p 3001` to use a different port |