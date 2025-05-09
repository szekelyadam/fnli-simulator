# FNLI Lotto Simulator

A full-stack application for simulating and managing lottery number draws with real-time updates using WebSocket technology.

## Project Structure

The project is organized as a monorepo using pnpm workspaces with two main packages:

- `packages/backend`: Node.js backend with WebSocket server
- `packages/frontend`: React frontend with Vite

## Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (v10.10.0 or later)
- PostgreSQL (v15 or later)

## Database Setup

1. Install PostgreSQL:

    - [Download PostgreSQL](https://www.postgresql.org/download/)
    - Follow the installation instructions for your operating system

2. Create a new database:

    ```bash
    createdb db_name
    ```

3. Configure the database connection:

    - Copy `.env.example` to `.env` in the backend package
    - Update the DATABASE_URL with your PostgreSQL credentials:
        ```
        DATABASE_URL="postgresql://username:password@localhost:5432/db_name"
        ```

4. Run database migrations:
    ```bash
    cd packages/backend
    pnpm prisma migrate dev
    ```

## Getting Started

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Start the development servers:

    For backend:

    ```bash
    cd packages/backend
    pnpm dev
    ```

    For frontend:

    ```bash
    cd packages/frontend
    pnpm dev
    ```

## Development

### Backend

The backend is built with:

- TypeScript
- WebSocket (ws) for real-time communication
- Prisma for database management
- PostgreSQL for data persistence
- Vitest for testing

Key features:

- Real-time number drawing
- Session management
- Ticket tracking
- Match counting
- Persistent storage of winning tickets

### Frontend

The frontend is built with:

- React 19
- TypeScript
- Vite
- TailwindCSS
- Nunito font

Features:

- Modern, responsive UI
- Real-time updates
- Interactive number selection
- Result display

## Testing

Run tests for both packages:

```bash
# Backend tests
cd packages/backend
pnpm test

# Frontend tests
cd packages/frontend
pnpm test
```

## Building for Production

1. Build the backend:

    ```bash
    cd packages/backend
    pnpm build
    ```

2. Build the frontend:
    ```bash
    cd packages/frontend
    pnpm build
    ```

## Code Quality

The project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

Run code quality checks:

```bash
# Format code
pnpm format

# Check formatting
pnpm format:check

# Run linting
pnpm lint
```

## License

ISC
