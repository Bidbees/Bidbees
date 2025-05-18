# Bidder Buddy Dashboard

This is a fullstack JavaScript Bidder Buddy dashboard with an interactive Mapbox map, tender management cards, and BidBees Intelligence AI chat functionality.

## Setup Instructions

### Prerequisites
- Node.js v18+ and npm
- Git (optional)
- Supabase account (for production deployment)

### Installation Steps (Development Mode)

1. Extract the downloaded files to a folder on your computer
2. Open the folder in VS Code
3. Create a `.env` file in the root directory with your Mapbox access token:
   ```
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```

4. Open a terminal in VS Code and run:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The application should be available at [http://localhost:5000](http://localhost:5000)

### Production Setup with Supabase

For production deployment with Supabase database integration:

1. Create a Supabase account and project at [https://supabase.com](https://supabase.com)

2. Add the following variables to your `.env` file:
   ```
   # Supabase configuration
   DATABASE_URL=postgres://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   
   # Session secret
   SESSION_SECRET=your-secure-random-string
   
   # Set to use database storage
   USE_DATABASE=true
   ```

3. Run database migrations to set up your Supabase database:
   ```bash
   npm run db:migrate
   ```

4. Build and start the production server:
   ```bash
   npm run build
   npm run start
   ```

See `AWS_DEPLOY.md` for detailed instructions on deploying to AWS infrastructure.

## Project Structure

- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - React components
    - `/hooks` - Custom React hooks
    - `/lib` - Utility functions
    - `/pages` - Page components

- `/server` - Express backend
  - `index.ts` - Server entry point
  - `routes.ts` - API routes
  - `storage.ts` - Data storage
  - `database.ts` - Supabase/PostgreSQL integration

- `/shared` - Shared code between frontend and backend
  - `schema.ts` - Data models and types

## Features

- Interactive Mapbox map showing tender locations in South Africa
- Dashboard with tender management cards
- BidBees Intelligence AI chat
- Responsive design
- PostgreSQL database integration with Supabase (production mode)
- File storage capabilities for images and documents

## Database Management

- Generate migrations: `npm run db:generate`
- Push schema changes: `npm run db:push`
- Run migrations: `npm run db:migrate`
- Visualize database: `npm run db:studio`

## Notes

- The application uses in-memory storage in development mode
- For production, it switches to Supabase PostgreSQL database
- The Mapbox token is required for the map functionality to work
- Supports both AWS and Supabase deployments