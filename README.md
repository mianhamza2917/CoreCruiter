# Fullstack Application

A complete full-stack web application with Vue.js frontend, Next.js backend, and PostgreSQL database.

## Features

- **Authentication System**: Login and signup functionality with JWT tokens
- **User Management**: Admin panel to add, edit, and remove users
- **Role-based Access**: Admin and User roles with different permissions
- **Modern UI**: Beautiful interface built with Vue.js and Tailwind CSS
- **Secure Backend**: Next.js API with authentication middleware
- **Database**: PostgreSQL with Prisma ORM

## Tech Stack

### Frontend
- Vue.js 3 with Composition API
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Next.js 14 with TypeScript
- Prisma ORM for database management
- JWT for authentication
- bcryptjs for password hashing

### Database
- PostgreSQL

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Copy `env.example` to `.env` and update the database URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

### 3. Database Migration

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Create Admin User

You can create an admin user directly in the database or use the signup API and manually update the role to 'ADMIN' in the database.

### 5. Start Development Servers

```bash
# Start backend server (runs on http://localhost:3000)
npm run dev

# In another terminal, start frontend server (runs on http://localhost:3001)
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### User Management (Admin Only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Project Structure

```
├── frontend/                 # Vue.js frontend
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/           # Page components
│   │   ├── stores/          # Pinia stores
│   │   ├── router/          # Vue Router config
│   │   └── style.css        # Global styles
│   ├── package.json
│   └── vite.config.ts
├── pages/                   # Next.js API routes
│   └── api/
│       ├── auth/            # Authentication endpoints
│       └── users/           # User management endpoints
├── lib/                     # Backend utilities
│   ├── prisma.ts           # Prisma client
│   └── auth.ts             # Authentication utilities
├── prisma/                  # Database schema
│   └── schema.prisma
├── package.json
└── README.md
```

## Usage

1. **Signup/Login**: Users can create accounts or sign in
2. **Dashboard**: Authenticated users see their profile and system status
3. **Admin Panel**: Admins can manage all users (add, edit, delete)

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- CORS configuration
- Input validation

## Development

### Backend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:studio    # Open Prisma Studio
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/fullstack_app"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License 