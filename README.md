# Basic E-Commerce Web App

This project is a TypeScript React application built with Vite and Tailwind CSS.

## Features

- Product listing page with API-driven product data
- Category filtering with multi-select support
- URL-persisted filters and sorting (shareable links, back/forward compatible)
- Product detail page using dynamic routing (`/product/:id`)
- Cart management via React Context API
- Add/remove cart item support
- Cart total value and item count
- Cart persistence with `localStorage`
- Page and cart interaction animations using Framer Motion
- Basic Cypress end-to-end tests

## Tech Stack

- React + TypeScript
- React Router
- Tailwind CSS
- Framer Motion
- Cypress

## API

The app uses the Platzi fake store API endpoints:

- `https://api.escuelajs.co/api/v1/products`
- `https://api.escuelajs.co/api/v1/categories`

Note: The official docs are hosted under `https://fakeapi.platzi.com`, while the live REST endpoints are served from `https://api.escuelajs.co/api/v1`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Run Cypress tests:

```bash
npm run test:e2e
```

For interactive test development:

```bash
npm run cy:open
```

## Assumptions and Limitations

- Multi-category filtering is implemented by refetching products for each selected category and merging server responses, because the API does not support an OR-based multi-category filter in a single request.
- Sorting is URL-persisted and applied in the client after API refetch for the selected filters.
- Product images and content are externally sourced from the public API and may vary over time.
