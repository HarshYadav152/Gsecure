# Contribution Guide

Thank you for contributing to G-Secure! This guide provides everything you need to make a meaningful contribution.

## Before You Start

- Read the [Code of Conduct](../CODE_OF_CONDUCT.md)
- Check existing [Issues](https://github.com/HarshYadav152/Gsecure/issues) before opening a new one
- For large changes, open an issue first to discuss your approach

## Setting Up for Development

Follow the [Installation Guide](./installation.md) to get the project running locally.

## Branching Strategy

Always branch off from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

Branch naming conventions:

| Type | Format | Example |
|------|--------|---------|
| Feature | `feat/description` | `feat/add-export-vault` |
| Bug fix | `fix/description` | `fix/login-jwt-expiry` |
| Docs | `docs/description` | `docs/add-api-guide` |
| Refactor | `refactor/description` | `refactor/vault-controller` |

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

## Making a Pull Request

1. Push your branch: `git push origin feat/your-feature-name`
2. Open a Pull Request against `main`
3. Fill out the PR template completely
4. Wait for a review — maintainers aim to review within 3 days

## Coding Standards

- Use **Tailwind CSS** for all styling — no inline styles
- Follow the existing component structure inside `gsecure/`
- All new API routes go under `gsecure/pages/api/` or `gsecure/app/api/`
- Run `npm run lint` before submitting a PR

## Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behaviour
- Browser/OS info
- Screenshot or error log if possible