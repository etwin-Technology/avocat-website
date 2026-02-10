# Law Firm Management System - Backend

Backend API system for managing legal firm appointments, contacts, and administration.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based permissions (admin, super_admin)
  - Secure password hashing with bcrypt

- **Appointment Management**
  - CRUD operations for appointments
  - Filtering, sorting, and pagination
  - Multiple status tracking
  - Bulk operations
  - Export to CSV/JSON

- **Contact Management**
  - Public contact form submission
  - Admin contact management
  - Urgency levels (emergency, urgent, normal, etc.)
  - Response tracking
  - Follow-up system

- **Dashboard & Analytics**
  - Real-time statistics
  - Charts and graphs data
  - Conversion rates
  - Response time analytics

- **Security**
  - CORS enabled
  - Rate limiting
  - Helmet security headers
  - Input validation
  - Error handling

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Security**: helmet, cors, rate limiting
- **Logging**: morgan, winston

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/law-firm-backend.git
   cd law-firm-backend

## API Documentation
**Authentication**
POST /api/auth/login - Admin login

POST /api/auth/logout - Admin logout

GET /api/auth/profile - Get admin profile

PUT /api/auth/profile - Update admin profile
**Appointments (Admin)**
GET /api/admin/appointments - Get all appointments with filters

POST /api/admin/appointments - Create new appointment

GET /api/admin/appointments/:id - Get single appointment

PUT /api/admin/appointments/:id - Update appointment

DELETE /api/admin/appointments/:id - Delete appointment

PUT /api/admin/appointments/:id/status - Update status

POST /api/admin/appointments/bulk-actions - Bulk operations

**Contacts**

POST /api/contact - Public contact form submission

GET /api/admin/contacts - Get all contacts (admin)

POST /api/admin/contacts - Create contact (admin)

POST /api/admin/contacts/:id/reply - Reply to contact

**Dashboard**

GET /api/admin/stats - Get dashboard statistics

GET /api/admin/stats/appointments-chart - Appointments chart data

GET /api/admin/stats/contacts-chart - Contacts chart data

**Default Admin Credentials**

Email: admin@cabinet.ma

Password: Admin123!
**Authentication**


 