# Entrex - Modern Web Application

## 📋 Overview

Entrex is a modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS. This document provides comprehensive documentation for developers looking to understand, implement, or extend the Entrex platform.

## 🎯 Key Features

### Core Functionality
- **Modern UI/UX**: Responsive design built with Tailwind CSS for consistent styling across devices
- **Type Safety**: Full TypeScript support for enhanced code quality and developer experience
- **Server-Side Rendering**: Optimized performance and SEO with Next.js
- **Fast Refresh**: Instant UI updates during development
- **Accessibility**: Built with web accessibility best practices

### Technical Highlights
- **Next.js 15**: Leveraging the latest features of Next.js with App Router
- **React 19**: Utilizing the latest React features and optimizations
- **Turbopack**: Ultra-fast development builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Type-safe JavaScript for better developer experience

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful architecture
- **Validation**: express-validator
- **Date Handling**: date-fns

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **HTTP Client**: Built-in Fetch API

### Development Tools
- **Package Manager**: npm / Yarn
- **Bundler**: Turbopack (dev) / Webpack (prod)
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript 5.x

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm (v9+) or Yarn (v1.22+)
- Git

### Development Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Satheeshraj05/entrex.git
   cd entrex
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install
   
   # OR using Yarn
   yarn
   ```

3. **Environment Configuration**
   
   # Backend API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000/api  # Update this if your backend is hosted elsewhere
   ```

4. **Start Development Server**
   ```bash
   # Using npm
   npm run dev
   
   # OR using Yarn
   yarn dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
entrex/
├── .next/                 # Next.js build output
├── public/               # Static files (images, fonts, etc.)
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── app/              # App Router pages and layouts
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── ...
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services and utilities
│   ├── styles/           # Global styles and Tailwind config
│   └── types/            # TypeScript type definitions
├── .eslintrc.json        # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠 Development Workflow

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Run TypeScript type checking
npm run type-check
```

### Code Style
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript types for all new code
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Keep components small and focused on a single responsibility

## 🌐 Backend Integration

### Backend Repository
- [GitHub Repository](https://github.com/Satheeshraj05/entrex_backend)

### API Configuration
The frontend communicates with the backend REST API. Make sure to set up the backend server before running the frontend.

### API Endpoints

#### Bookings
- `GET /bookings` - Retrieve all bookings
- `POST /bookings` - Create a new booking
- `GET /bookings/:id` - Get a specific booking
- `PUT /bookings/:id` - Update a booking
- `DELETE /bookings/:id` - Delete a booking

### CORS Configuration
The backend is configured with CORS support. Ensure your frontend domain is whitelisted in the backend configuration if deploying to production.

### Data Flow
1. Frontend makes HTTP requests to the backend API
2. Backend processes requests and interacts with MongoDB
3. Responses are returned in JSON format
4. Frontend handles the response and updates the UI accordingly

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run test coverage
npm test -- --coverage
```

### Testing Strategy
- Unit tests for utility functions and custom hooks
- Component tests for UI components
- Integration tests for critical user flows
- End-to-end tests for key user journeys

## 🚀 Deployment

### Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```







