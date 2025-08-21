# HayTree Web Services - Delaware Web Development Company

## Overview

HayTree Web Services is a full-stack web application built as a modern company website for a Delaware-based web development business. The application features a comprehensive marketing site with contact functionality, showcasing web design, development, and maintenance services. The project uses a React frontend with Express backend, implementing modern web development practices including responsive design, form handling, and database integration for contact submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18 SPA**: Single-page application using React with TypeScript for type safety
- **Vite Build System**: Modern build tooling with hot module replacement and optimized production builds
- **Wouter Router**: Lightweight client-side routing for navigation between pages
- **shadcn/ui Components**: Comprehensive UI component library built on Radix UI primitives with Tailwind CSS styling
- **Framer Motion**: Animation library for smooth page transitions and interactive elements
- **TanStack Query**: Server state management for API calls and caching

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for JSON parsing and request logging
- **TypeScript**: Full TypeScript implementation across client and server for type safety
- **In-Memory Storage**: Currently using MemStorage class for data persistence with plans for database integration
- **Shared Schema**: Common TypeScript types and Zod validation schemas shared between frontend and backend

### Styling and Design System
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **CSS Custom Properties**: Design system using CSS variables for colors, fonts, and spacing
- **Responsive Design**: Mobile-first approach with breakpoint-based responsive layouts
- **Dark Mode Support**: Built-in dark mode capabilities through CSS variables

### Form Handling and Validation
- **React Hook Form**: Form state management with client-side validation
- **Zod Schema Validation**: Type-safe validation on both client and server sides
- **Toast Notifications**: User feedback system for form submissions and errors

### Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Modern TypeScript ORM configured for PostgreSQL
- **PostgreSQL**: Production database (configured but not currently implemented)
- **Neon Database**: Serverless PostgreSQL database provider for production deployment

### UI and Animation Libraries
- **Radix UI**: Headless UI primitives for accessibility-compliant components
- **Framer Motion**: Animation library for page transitions and micro-interactions
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

### Development and Deployment
- **Replit Integration**: Development environment integration with runtime error handling
- **Vite Plugins**: Development tooling including error overlay and cartographer for Replit
- **Connect PG Simple**: Session store for PostgreSQL (configured for future use)

### Form and Data Handling
- **Date-fns**: Date manipulation and formatting utility
- **React Hook Form**: Form state management
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

### Utilities and Helpers
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional CSS class utility
- **Tailwind Merge**: Utility for merging Tailwind CSS classes intelligently
- **cmdk**: Command palette component for search functionality