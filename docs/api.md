# API & Authentication Documentation

G-Secure uses Next.js API Routes for backend logic. Protected routes require a valid JWT carried in the `authToken` cookie.

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




## Vault (Password Storage)

All vault routes require authenticated requests. Include cookies in your fetch calls:

credentials: "include"
### Add a new entry

**Request body:**
```json
{
  
  "website": "github.com",
  "username": "<AES-encrypted>",
  "password": "<AES-encrypted>",
  "keyword": "<user-provided-master-key>",
  "notes": "optional notes"

}
```

### Delete an entry

**Example:**
**Response:**
```json
{
  "message": "Entry deleted successfully"
}
```

---

### Expose (View) an entry

Fetches and decrypts a single vault entry by its ID.

**Example:**
**Response:**
```json
{
  "_id": "64abc123def456",
  "website": "github.com",
  "username": "<AES-decrypted>",
  "password": "<AES-decrypted>",
  "notes": "optional notes"
}
```

> Decryption happens client-side using the user's keyword. The server returns the encrypted blob.
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