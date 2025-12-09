## Automated Matching for Recruiters

This repository contains a modern web application that helps recruiters automate matching between candidates and open roles.

It is built with **Next.js (App Router)**, **TypeScript**, **Redux Toolkit (RTK Query)**, **next-intl** for localization, and a Tailwind-based UI.

---

## Features

- **Automated matching UI** – interface for viewing and managing users/candidates.
- **API-driven data layer** – RTK Query with a configurable `NEXT_PUBLIC_API_BASE_URL`.
- **Authentication-aware requests** – `Authorization: Bearer <token>` header injected from an `access_token` cookie.
- **Global state management** – Redux store configured in `src/redux/store`.
- **Internationalization** – powered by `next-intl` with `NextIntlClientProvider`.
- **Modern UI stack** – Tailwind CSS v4, Radix UI primitives, Lucide icons, Sonner toasts.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, `src/app`)
- **Language:** TypeScript
- **State Management:** Redux Toolkit, RTK Query
- **Styling:** Tailwind CSS 4, `tailwind-merge`
- **UI & UX:** Radix UI, Lucide, Sonner, Framer Motion
- **i18n:** `next-intl`

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (or another package manager if you prefer)

### Installation

```bash
npm install
```

### Running the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Environment Variables

The app relies on the following environment variables (see `.env.development`, `.env.test`, `.env.production`):

- `NEXT_PUBLIC_API_BASE_URL` – Base URL of the backend API used by RTK Query (`src/redux/api/api.config.ts`).

Authentication tokens are read from the `access_token` cookie and attached as a **Bearer** token in the `Authorization` header for API requests.

Make sure to set the appropriate variables in your environment files before running or building the app.

---

## NPM Scripts

From `package.json`:

- `npm run dev` – Start the development server.
- `npm run build` – Build the production bundle.
- `npm run start` – Start the production server (after `build`).
- `npm run lint` – Run ESLint.

---

## Project Structure (high level)

Some key folders:

- `src/app` – Next.js App Router pages, layouts, and routes.
- `src/providers` – Global providers such as `ReduxProvider`.
- `src/redux` – Store, API configuration, and slices.
- `public` – Static assets.

---

## Deployment

The app is configured with `output: 'standalone'` in `next.config.ts`, which is suitable for containerized or custom deployments.

General steps:

1. **Build:** `npm run build`
2. **Start:** `npm run start`

Ensure the required environment variables are set in your deployment environment.

---

## License

This project is proprietary unless stated otherwise by the repository owner.
