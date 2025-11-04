# Lumina Boutique Commerce Platform

Lumina Boutique is a full-stack commerce experience built with a modern JavaScript tooling stack. The platform delivers a polished storefront, secure checkout, and a personalised customer dashboard while remaining ready to deploy on popular cloud providers.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 13 (React 18), Redux Toolkit, Framer Motion |
| Backend | Express.js, MongoDB (Mongoose), Stripe, PayPal SDK |
| Authentication | JSON Web Tokens, Passport Google/Facebook OAuth |
| Hosting Targets | Vercel for the frontend, DigitalOcean/Render for the API |

## Features

### Storefront
- Hero with promotional highlights, CTA, and animated product carousel.
- Catalog with category/price/availability filters, server-backed search with autocomplete, and lazy loaded galleries.
- Product detail pages featuring zoomable galleries, animation-rich add-to-cart button, reviews, and specification tabs.
- Personalised recommendations that update from browsing history.

### Shopping Flow
- Persistent cart with skeleton loaders and optimistic updates.
- Checkout with shipping form validation, payment option selection (Stripe & PayPal), CSRF protection, and order summary.
- Order confirmation and email-ready payload from the backend.

### Customer Area
- Secure login with JWT + OAuth (Google/Facebook) including social buttons.
- Profile editor, address book, favourites, and full order history.
- Account security controls with password update (bcrypt hashed) and device management stubs.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- Stripe & PayPal credentials
- Google and Facebook OAuth credentials

### Environment Variables
Copy the `.env.example` files from `frontend` and `backend`, then fill them with your secrets.

```
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### Development

Install dependencies in both workspaces:

```
cd frontend && npm install
cd ../backend && npm install
```

Run the API and the web client concurrently (two terminals):

```
cd backend && npm run dev
cd frontend && npm run dev
```

The storefront will be available at `http://localhost:3000`, and the API at `http://localhost:5000`.

### Testing & Linting

- `frontend`: `npm run lint`
- `backend`: `npm test`

## Deployment

- Frontend: deploy the Next.js app to Vercel or Netlify with environment variables configured.
- Backend: deploy the Express API to DigitalOcean App Platform, Render, or Railway.
- Configure HTTPS, environment variables, MongoDB, Stripe, and PayPal secrets in your hosting control panel.

## Security Checklist

- CSRF protection enabled on the checkout endpoints.
- Input sanitisation via `express-validator` and `sanitize-html`.
- Password hashing via `bcryptjs` before persistence.
- Rate limiting and Helmet for hardened headers.

## License

MIT
