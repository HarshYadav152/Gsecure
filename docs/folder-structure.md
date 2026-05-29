# Folder Structure

This document explains the layout of the G-Secure repository.

## Root Level

Gsecure/
├── gsecure/              # Main Next.js application
├── docs/                 # Project documentation (you are here)
├── .github/              # GitHub templates (issue/PR templates)
├── README.md             # Project overview
├── CONTRIBUTING.md       # Quick contribution guide
├── CODE_OF_CONDUCT.md    # Community standards
├── SECURITY.md           # Security policy & vulnerability reporting
└── LICENSE               # MIT License

## Inside `gsecure/` (the Next.js App)

gsecure/
├── app/                  # Next.js App Router (pages and layouts)
│   ├── layout.js         # Root layout (fonts, global styles)
│   ├── page.js           # Home/landing page
│   ├── register/         # Registration page
│   ├── login/            # Login page
│   ├── dashboard/        # User vault dashboard
│   └── api/              # API route handlers
│       ├── auth/         # Auth routes (login, register, OAuth)
│       ├── vault/        # Vault CRUD routes
│       └── utils/        # Utility routes (strength, breach check)
├── components/           # Reusable React components
│   ├── Navbar.jsx
│   ├── PasswordCard.jsx
│   └── ...
├── lib/                  # Utility functions and helpers
│   ├── db.js             # MongoDB connection
│   ├── encrypt.js        # AES encryption/decryption helpers
│   └── auth.js           # JWT helpers
├── models/               # Mongoose data models
│   ├── User.js
│   └── Vault.js
├── public/               # Static assets (images, icons)
├── styles/               # Global CSS
│   └── globals.css
├── .env.local.example    # Environment variable template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts

## `docs/` Directory
docs/
├── installation.md       # Setup and local development guide
├── architecture.md       # System design and tech stack overview
├── api.md                # API endpoints and authentication
├── contribution-guide.md # Detailed contribution workflow
├── deployment.md         # How to deploy to production
└── folder-structure.md   # This file