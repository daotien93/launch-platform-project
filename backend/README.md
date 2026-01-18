# Backend API

NestJS backend application with authentication, user management, and product management.

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Passport** - Authentication strategy
- **bcrypt** - Password hashing
- **class-validator** - DTO validation

## Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── config/                 # Configuration files
│   ├── common/                 # Shared utilities
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── filters/
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   └── products/           # Product management
│   └── prisma/                 # Prisma service
├── prisma/
│   └── schema.prisma           # Database schema
├── .env                        # Environment variables
└── package.json
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users/profile` - Get current user profile (Protected)
- `GET /users` - Get all users (Protected)

### Products
- `POST /products` - Create a product (Protected)
- `GET /products` - Get all products (Protected)
- `GET /products/:id` - Get a product by ID (Protected)
- `PUT /products/:id` - Update a product (Protected)
- `DELETE /products/:id` - Delete a product (Protected)

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Database Schema

The application uses Prisma with PostgreSQL. The schema includes:
- **User** - User accounts with authentication
- **Product** - Products created by users

## Development Tools

- `npm run prisma:studio` - Open Prisma Studio to view/edit database
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## License

MIT
