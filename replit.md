# Grabbix Smart Store Platform

## Overview

This is a modern full-stack web application for Grabbix, a company that provides AI-powered smart stores and autonomous retail solutions. The platform serves as a marketing website with contact form functionality, showcasing smart coolers, smart stores, and micro markets for offices, apartments, and shared spaces.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors and design system
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript (ESM modules)
- **Framework**: Express.js for HTTP server and API routes
- **Development**: tsx for TypeScript execution in development
- **Database Integration**: Drizzle ORM with PostgreSQL support
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL-based session store

### Full-Stack Integration
- **Monorepo Structure**: Shared TypeScript types and schemas between client/server
- **API Communication**: RESTful API with type-safe client-server communication
- **Development Server**: Vite dev server with Express API proxy in development
- **Production Build**: Static frontend served by Express server

## Key Components

### Frontend Components
- **Landing Page Sections**: Hero, Navigation, How It Works, Products, Benefits, Use Cases, Contact, Footer
- **Contact Form**: Validated form with real-time submission and toast notifications
- **Location Pages**: 51 SEO-optimized suburb-specific landing pages for Melbourne generated via Python template system
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Toast Notifications**: User feedback system for form submissions and errors

### Backend Services
- **Contact API**: Handles contact form submissions with validation
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database migration)
- **Request Logging**: Custom middleware for API request logging and monitoring

### Database Schema
- **Users Table**: Basic user authentication structure (prepared for future use)
- **Contacts Table**: Stores contact form submissions with metadata
- **Schema Validation**: Zod schemas for type-safe data validation

## Data Flow

1. **User Interaction**: Users interact with the React frontend components
2. **Form Submission**: Contact forms are validated client-side with React Hook Form + Zod
3. **API Request**: TanStack Query handles API communication with type-safe requests
4. **Server Processing**: Express routes validate and process requests using shared schemas
5. **Data Persistence**: Currently uses in-memory storage, ready for PostgreSQL migration
6. **Response Handling**: Client updates UI with toast notifications and form resets

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class management

### Data and Forms
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Performant form handling
- **Zod**: Runtime type validation and schema parsing
- **Drizzle ORM**: Type-safe database ORM

### Development Tools
- **TypeScript**: Type safety across the full stack
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` runs both frontend and backend
- **Hot Reload**: Vite HMR for frontend, tsx for backend TypeScript execution
- **Database**: Uses in-memory storage for development (PostgreSQL ready)

### Production Build
- **Frontend Build**: Vite builds optimized static assets to `dist/public`
- **Backend Build**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serves both API and static files
- **Database**: Ready for PostgreSQL deployment with Drizzle migrations

### Replit Integration
- **Modules**: nodejs-20, web, postgresql-16
- **Auto-deployment**: Configured for autoscale deployment target
- **Port Configuration**: Serves on port 5000 (mapped to external port 80)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 8, 2025. Added 51 location-specific landing pages for Melbourne suburbs with Python template system for SEO optimization
- June 26, 2025. Initial setup