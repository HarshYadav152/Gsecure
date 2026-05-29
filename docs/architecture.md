# Project Architecture

G-Secure is a full-stack web application built with Next.js. Here is an overview of how the system is structured.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Next.js API Routes |
| Database | MongoDB |
| Auth | JWT, bcrypt, Google OAuth, GitHub OAuth |
| Encryption | AES-256 |

## High-Level Architecture

## Authentication Flow

1. User registers or logs in (email/password, Google, or GitHub).
2. Password is hashed with **bcrypt** before storage.
3. On successful login, a **JWT token** is issued and stored client-side.
4. All subsequent API requests carry the JWT for verification.

## Encryption Flow

- Passwords stored in the vault are encrypted using **AES-256**.
- Only the authenticated user's key is used for encryption/decryption.
- The server never has access to plaintext passwords — **Zero Knowledge Architecture**.

## Zero Knowledge Protocol

## Key Features Architecture

- **Password Generator** — Runs entirely client-side in the browser.
- **Password Strength Checker** — Real-time regex-based scoring on the frontend.
- **Breach Detection** — Queries the HaveIBeenPwned API using k-Anonymity (only a partial hash is sent).