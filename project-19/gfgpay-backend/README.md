# gfgpay-backend (simple version)

Minimal wallet/payment backend for testing.

This version intentionally does **not** include:
- Joi validation
- Winston/Morgan logging
- Helmet/CORS/rate limiting

## 1. Setup

```bash
cd project-19/gfgpay-backend
cp .env.example .env
npm install
```

## 2. Run

```bash
npm run dev
```

## 3. API Endpoints

### Auth
- `POST /api/auth/register`
  - body: `{ "name": "Manish", "email": "manish@example.com", "password": "123456" }`
- `POST /api/auth/login`
  - body: `{ "email": "manish@example.com", "password": "123456" }`
- `GET /api/auth/me` (Bearer token)

### Wallet
- `GET /api/wallet/balance` (Bearer token)
- `POST /api/wallet/add-money` (Bearer token)
  - body: `{ "amount": 500 }`
- `POST /api/wallet/transfer` (Bearer token)
  - body: `{ "toEmail": "friend@example.com", "amount": 100, "note": "test transfer" }`
- `GET /api/wallet/transactions` (Bearer token)

