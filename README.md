# Node.js API

A RESTful API built with Node.js, Express, TypeScript, and Prisma ORM for PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for Products, Updates, and UpdatePoints
- Input validation using express-validator
- Environment-based configuration
- Logging with Morgan
- CORS support

## Project Structure

```
.
├── prisma/                  # Prisma schema and migrations
├── src/
│   ├── config/              # Environment configs
│   ├── generated/           # Generated Prisma client
│   ├── handlers/            # Route handlers (controllers)
│   ├── modules/             # Auth and middleware modules
│   ├── __tests__/           # Test files
│   ├── db.ts                # Prisma client instance
│   ├── index.ts             # App entry point
│   ├── router.ts            # Express router
│   └── server.ts            # Express app setup
├── package.json
├── tsconfig.json
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Setup

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd nodejs-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your database credentials and JWT secret.

4. **Set up the database:**
   ```sh
   npx prisma migrate deploy
   ```

5. **Generate Prisma client:**
   ```sh
   npx prisma generate
   ```

### Running the App

- **Development:**
  ```sh
  npm run dev
  ```

- **Production Build:**
  ```sh
  npm run build
  npm start
  ```

### Running Tests

```sh
npm test
```

## API Endpoints

- `POST /user` - Register new user
- `POST /sign-in` - User login
- `GET /api/products` - List products (auth required)
- `POST /api/product` - Create product (auth required)
- `PUT /api/product/:id` - Update product (auth required)
- `DELETE /api/product/:id` - Delete product (auth required)
- `GET /api/update` - List updates (auth required)
- ...and more (see [src/router.ts](src/router.ts))

## License

ISC

---

**Author:** CHERRAT Yahia
