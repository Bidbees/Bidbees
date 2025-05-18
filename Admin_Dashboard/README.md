# BidBees Admin Dashboard

This is the administrative control panel for the BidBees platform. It provides comprehensive management capabilities for the entire system.

## Features

- **User Management**: Create, edit, and manage user accounts and permissions
- **System Health Monitoring**: Monitor the status and performance of all microservices
- **Content Moderation**: Review and moderate user-generated content
- **Financial Oversight**: Track transactions and financial metrics
- **Support Ticket Management**: Handle customer support requests
- **System Settings**: Configure platform-wide settings and integrations

## Tech Stack

- **Frontend**: React with Material-UI components
- **Backend**: Node.js with Express
- **Database**: PostgreSQL via AWS RDS
- **Authentication**: JWT-based auth with role-based permissions
- **Data Visualization**: Chart.js and D3.js

## Getting Started

### Prerequisites

- Node.js v18+ and npm
- PostgreSQL database
- AWS account (for production deployment)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create an `.env` file based on `.env.example`
4. Start the development server:
   ```
   npm run dev
   ```
5. Access the admin dashboard at [http://localhost:5001](http://localhost:5001)

### Development Login

For local development, you can use these credentials:
- Username: `admin`
- Password: `admin`

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
  - `vite.ts` - Development server setup

- `/shared` - Shared code between frontend and backend
  - `schema.ts` - Data models and types

## Deployment

The Admin Dashboard is designed to be deployed as part of the BidBees microservices architecture on AWS. See the AWS deployment documentation for detailed instructions.

## Microservices Integration

This Admin Dashboard connects to and manages all microservices in the BidBees ecosystem:

- Bidder Service
- Tender Management
- BEE Tasks
- Courier Service
- Supplier Management
- Document Management
- and more...

## License

Proprietary - All rights reserved.