# Frontend - Vue.js Application

This is the Vue.js frontend for the fullstack application.

## Features

- **Modern UI**: Built with Vue.js 3 and Tailwind CSS
- **Authentication**: Login and signup forms with validation
- **Dashboard**: User dashboard with profile information
- **Admin Panel**: Complete user management interface
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- Vue.js 3 with Composition API
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Axios for API communication
- TypeScript for type safety

## Setup

### Prerequisites

- Node.js 18+
- Backend server running on http://localhost:3000

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3001

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components
│   ├── Login.vue       # Login page
│   ├── Signup.vue      # Signup page
│   ├── Dashboard.vue   # User dashboard
│   └── AdminPanel.vue  # Admin user management
├── stores/             # Pinia stores
│   └── auth.ts         # Authentication store
├── router/             # Vue Router configuration
│   └── index.ts        # Route definitions
├── style.css           # Global styles with Tailwind
├── main.ts             # Application entry point
└── App.vue             # Root component
```

## Features

### Authentication
- Login form with email/password
- Signup form with name, email, and password
- JWT token management
- Automatic token refresh
- Protected routes

### Dashboard
- User profile display
- System status indicators
- Quick actions menu
- Navigation to admin panel (for admins)

### Admin Panel
- View all users in a table
- Add new users with role selection
- Edit existing user information
- Delete users with confirmation
- Role-based access control

## API Integration

The frontend communicates with the backend API endpoints:

- Authentication: `/api/auth/*`
- User Management: `/api/users/*`

All API calls include JWT authentication headers automatically.

## Styling

The application uses Tailwind CSS with custom components:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.input-field` - Form input styling
- `.card` - Card container styling

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables

The frontend is configured to proxy API requests to the backend server. Make sure the backend is running on http://localhost:3000.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow Vue.js style guide
2. Use TypeScript for type safety
3. Write meaningful component names
4. Add comments for complex logic
5. Test on multiple browsers 