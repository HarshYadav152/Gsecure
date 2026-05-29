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
3. On successful login, a **JWT token** is issued in the `authToken` cookie.
4. Protected routes verify the JWT from cookies on subsequent requests.

## Encryption Flow

- Passwords stored in the vault are encrypted using **AES-256**.
- Vault fields are encrypted client-side before submission.
- Decryption requires the user-provided keyword during vault operations.
- Current design reduces plaintext exposure in transit/storage, but is not strict zero-knowledge.

## Key Features Architecture

- **Password Generator** — Runs entirely client-side in the browser.
- **Password Strength Checker** — Real-time regex-based scoring on the frontend.
- **Breach Detection** — Queries the HaveIBeenPwned API using k-Anonymity (only a partial hash is sent).