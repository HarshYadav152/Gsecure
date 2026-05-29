# API & Authentication Documentation

G-Secure uses Next.js API Routes for all backend logic. All protected routes require a valid JWT token.

## Authentication

### Register a new user

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

### Log in

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### OAuth Login (Google / GitHub)

G-Secure supports OAuth via NextAuth.js. Redirect the user to:
---

## Vault (Password Storage)

All vault routes require the `Authorization` header:
### Get all vault entries
### Add a new entry

**Request body:**
```json
{
  "site": "github.com",
  "username": "myusername",
  "password": "encryptedPasswordHere"
}
```

### Delete an entry

---

## Utilities

### Check password strength

**Request body:**
```json
{
  "password": "MyPassword123!"
}
```

### Check for breaches

**Request body:**
```json
{
  "password": "MyPassword123!"
}
```

> Uses the [HaveIBeenPwned API](https://haveibeenpwned.com/API/v3) with k-Anonymity — only the first 5 characters of the SHA-1 hash are sent.