# Survey-360

A comprehensive web application for managing and conducting surveys with an intuitive dashboard interface. This project is built with a modern tech stack combining **React + TypeScript** for the frontend and **Laravel** for the backend API.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Survey-360 is a full-stack survey management application designed to facilitate the creation, distribution, and analysis of surveys. The application includes:

- **Frontend Dashboard**: A modern React-based admin panel for survey management with data visualization
- **Backend API**: RESTful API built with Laravel for handling survey operations with complete CRUD functionality
- **Database**: MySQL database for storing survey data, questions, responses, and user information

### Language Composition
- **TypeScript**: 52.9% - Frontend type safety
- **PHP**: 21.6% - Backend logic
- **JavaScript**: 17.1% - Frontend utilities
- **CSS**: 3.9% - Styling
- **Blade**: 3.1% - Laravel templates
- **HTML**: 1.4% - Markup

---

## ✨ Features

### Core Functionality

#### User Management
- User registration with email validation
- Secure authentication system with Laravel Sanctum
- User profile management
- Role-based access control

#### Survey Management
- Create and manage multiple surveys
- Organize surveys by periods/cycles
- Generate unique survey links for distribution
- Track survey status and analytics

#### Question Management
- Create questions organized by categories
- Support for multiple question types
- Easy category management
- Reusable question bank

#### Response Collection
- Collect survey responses with rating system (1-5 scale)
- Track respondent information
- Record submission timestamps
- Multiple response handling

#### Data Analysis & Dashboard
- Visual dashboard with analytics
- Charts and graphs for survey results
- Response statistics
- Period-based reporting

### Technical Features
- **RESTful API**: Complete API endpoints for all operations
- **Authentication**: Laravel Sanctum token-based authentication
- **Responsive Design**: Modern responsive UI using Tailwind CSS v4
- **Type Safety**: Full TypeScript support for enhanced code quality
- **Data Visualization**: ApexCharts for interactive charts
- **Accessibility**: Built-in accessibility features
- **Dark Mode Support**: Theme customization

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.0 | UI Framework |
| TypeScript | ~5.7.2 | Type Safety |
| Tailwind CSS | 4.0 | CSS Framework |
| Vite | 6.1 | Build Tool |
| TailAdmin | 2.0 | Dashboard Template |
| ApexCharts | 4.1 | Data Visualization |
| Axios | 1.13 | HTTP Client |
| React Router | 7.1 | Navigation |
| React Data Table | 7.7 | Table Component |
| FullCalendar | 6.1 | Calendar Component |
| Sweetalert2 | 11.26 | Notifications |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Laravel | 8.x | Web Framework |
| PHP | ^7.3 | Server Language |
| MySQL | 5.7+ | Database |
| Laravel Sanctum | ^2.11 | API Authentication |
| Guzzle | ^7.0 | HTTP Client |
| Laravel CORS | ^2.0 | CORS Support |
| Composer | Latest | Dependency Manager |

---

## 📁 Project Structure

```
Survey-360/
│
├── frontend/                          # React TypeScript Application
│   ├── src/                           # Source code directory
│   ├── public/                        # Static assets
│   ├── package.json                   # NPM dependencies and scripts
│   ├── package-lock.json              # Dependency lock file
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── tsconfig.app.json              # App-specific TypeScript config
│   ├── tsconfig.node.json             # Node-specific TypeScript config
│   ├── vite.config.ts                 # Vite build configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── eslint.config.js               # ESLint rules
│   ├── index.html                     # Entry HTML file
│   ├── README.md                      # Frontend documentation
│   └── LICENSE.md                     # Frontend license
│
├── survey-app/                        # Laravel Backend Application
│   ├── app/                           # Application code
│   │   ├── Http/
│   │   │   └── Controllers/           # API Controllers
│   │   │       ├── Api/
│   │   │       │   ├── UserController.php
│   │   │       │   ├── GenerateSurveyController.php
│   │   │       │   ├── KategoriController.php
│   │   │       │   ├── PenilaianController.php
│   │   │       │   ├── PeriodeController.php
│   │   │       │   ├── PertanyaanController.php
│   │   │       │   └── RespondenController.php
│   │   └── Models/                    # Eloquent Models
│   │       ├── User.php
│   │       ├── Periode.php
│   │       ├── Kategori.php
│   │       ├── Pertanyaan.php
│   │       ├── Responden.php
│   │       ├── Penilaian.php
│   │       └── PenilaianDetail.php
│   │
│   ├── routes/                        # Route definitions
│   │   ├── api.php                    # API routes
│   │   └── web.php                    # Web routes
│   │
│   ├── database/                      # Database related files
│   │   ├── migrations/                # Database migrations
│   │   ├── factories/                 # Model factories
│   │   └── seeders/                   # Database seeders
│   │
│   ├── resources/                     # Resource classes
│   ├── config/                        # Configuration files
│   ├── bootstrap/                     # Bootstrap files
│   ├── composer.json                  # PHP dependencies
│   ├── composer.lock                  # Dependency lock file
│   ├── .env.example                   # Environment variables template
│   ├── .env                           # Environment variables (local)
│   ├── artisan                        # Laravel CLI
│   └── README.md                      # Backend documentation
│
├── mcp_tool/                          # MCP Tool dependencies
│
├── erd.md                             # Entity Relationship Diagram documentation
├── survey_app.sql                     # Database dump/backup
├── index.html                         # Root HTML
├── test.txt                           # Test file
├── paper-dashboard-react-main.zip     # Dashboard template archive
│
└── README.md                          # This file (Project documentation)
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or later (20.x or 22.x recommended)
- **PHP**: 7.3 or later (8.0+ recommended)
- **Composer**: Latest version ([Download](https://getcomposer.org/))
- **MySQL**: 5.7 or later (8.0+ recommended)
- **Git**: For version control

### Backend Setup (Laravel)

#### Step 1: Navigate to Backend Directory
```bash
cd survey-app
```

#### Step 2: Copy Environment File
```bash
cp .env.example .env
```

#### Step 3: Install PHP Dependencies
```bash
composer install
```

#### Step 4: Generate Application Key
```bash
php artisan key:generate
```

#### Step 5: Configure Database
Edit the `.env` file with your database credentials:
```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey_app
DB_USERNAME=root
DB_PASSWORD=
```

#### Step 6: Run Database Migrations
```bash
php artisan migrate
```

#### Step 7: (Optional) Seed the Database
```bash
php artisan db:seed
```

#### Step 8: Start Laravel Development Server
```bash
php artisan serve
```

The API will be available at:
```
http://localhost:8000
API Endpoint: http://localhost:8000/api
```

### Frontend Setup (React)

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

#### Step 3: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at:
```
http://localhost:5173
```

#### Step 4: (Optional) Build for Production
```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

---

## ⚙️ Configuration

### Backend Configuration (.env)

Create and configure your `.env` file in the `survey-app` directory:

```dotenv
# Application
APP_NAME=Survey-360
APP_ENV=local
APP_KEY=                    # Generated by php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost

# Logging
LOG_CHANNEL=stack

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey_app
DB_USERNAME=root
DB_PASSWORD=

# Broadcasting
BROADCAST_DRIVER=log

# Cache & Session
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Redis (Optional)
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail (Optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

# Pusher (Optional)
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory (if needed):

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Survey-360
```

Update API configuration in your axios setup or appropriate file:

```typescript
// Example: src/api/client.ts or similar
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if authenticated
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## 📖 Usage

### Getting Started

#### 1. Register a New User
```bash
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### 2. Login
```bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "token": "your_auth_token"
}
```

#### 3. Use Token for Authenticated Requests
Add the token to your request headers:
```
Authorization: Bearer your_auth_token
```

#### 4. Access Dashboard
Open your browser and navigate to:
```
http://localhost:5173
```

### Common Workflows

#### Create a Survey Period
```bash
POST http://localhost:8000/api/periode
Authorization: Bearer {token}
Content-Type: application/json

{
  "nama_periode": "Semester Ganjil 2025",
  "status": "active"
}
```

#### Create a Category
```bash
POST http://localhost:8000/api/kategori
Authorization: Bearer {token}
Content-Type: application/json

{
  "nama_kategori": "Kualitas Pengajaran"
}
```

#### Add Questions
```bash
POST http://localhost:8000/api/pertanyaan
Authorization: Bearer {token}
Content-Type: application/json

{
  "kategori_id": 1,
  "pertanyaan": "Bagaimana kualitas pengajaran?"
}
```

#### Generate Survey Link
```bash
POST http://localhost:8000/api/survey
Authorization: Bearer {token}
Content-Type: application/json

{
  "periode_id": 1,
  "slug": "survey-2025-1"
}

Response:
{
  "id": 1,
  "slug": "survey-2025-1",
  "link": "http://localhost:5173/survey/survey-2025-1"
}
```

#### Submit Survey Response
```bash
POST http://localhost:8000/api/penilaian
Content-Type: application/json

{
  "responden_id": 1,
  "tanggal_penilaian": "2025-06-22",
  "details": [
    {
      "pertanyaan_id": 1,
      "jawaban": 4
    },
    {
      "pertanyaan_id": 2,
      "jawaban": 5
    }
  ]
}
```

---

## 📊 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
This API uses **Laravel Sanctum** for token-based authentication.

All protected routes require the `Authorization` header:
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Response Format

All API responses follow a consistent JSON format:

**Success Response:**
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": { }
}
```

### API Endpoints

#### Authentication (Public Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user` | Get all users |
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| DELETE | `/user/{id}` | Delete user |

#### Protected Routes (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/logout` | Logout user |
| GET | `/user/current` | Get current authenticated user |

#### Period Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/periode` | List all periods |
| POST | `/periode` | Create new period |
| PUT | `/periode/{id}` | Update period |
| DELETE | `/periode/{id}` | Delete period |

**Example: Create Period**
```bash
POST /api/periode
{
  "nama_periode": "Semester Ganjil 2025",
  "status": "active"
}
```

#### Question Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pertanyaan` | List all questions |
| POST | `/pertanyaan` | Create new question |
| PUT | `/pertanyaan/{id}` | Update question |
| DELETE | `/pertanyaan/{id}` | Delete question |

**Example: Create Question**
```bash
POST /api/pertanyaan
{
  "kategori_id": 1,
  "pertanyaan": "How satisfied are you with the teaching quality?"
}
```

#### Category Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/kategori` | List all categories |
| POST | `/kategori` | Create new category |
| PUT | `/kategori/{id}` | Update category |
| DELETE | `/kategori/{id}` | Delete category |

**Example: Create Category**
```bash
POST /api/kategori
{
  "nama_kategori": "Kualitas Pengajaran"
}
```

#### Respondent Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/responden` | List all respondents |
| POST | `/responden` | Create new respondent |
| PUT | `/responden/{id}` | Update respondent |
| DELETE | `/responden/{id}` | Delete respondent |

**Example: Create Respondent**
```bash
POST /api/responden
{
  "user_id": 1,
  "periode_id": 1,
  "nama_responden": "John Doe"
}
```

#### Assessment/Response Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/penilaian` | List all assessments |
| POST | `/penilaian` | Submit new assessment |
| GET | `/penilaian/{id}` | Get assessment details |
| DELETE | `/penilaian/{id}` | Delete assessment |

**Example: Submit Assessment**
```bash
POST /api/penilaian
{
  "responden_id": 1,
  "tanggal_penilaian": "2025-06-22",
  "details": [
    {
      "pertanyaan_id": 1,
      "jawaban": 4
    },
    {
      "pertanyaan_id": 2,
      "jawaban": 5
    }
  ]
}
```

#### Survey Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/survey` | List all surveys |
| POST | `/survey` | Generate new survey link |
| GET | `/survey/{slug}` | Get survey by slug (public) |
| PUT | `/survey/{id}` | Update survey |
| DELETE | `/survey/{id}` | Delete survey |

**Example: Generate Survey Link**
```bash
POST /api/survey
{
  "periode_id": 1,
  "slug": "survey-2025-1"
}
```

**Example: Get Survey Details (Public)**
```bash
GET /api/survey/survey-2025-1
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
+-------------+       +----------------+       +--------------------+
|   users     |       |   respondens   |       |     penilaians     |
+-------------+       +----------------+       +--------------------+
| id (PK)     |       | id (PK)        |-------| id (PK)            |
| name        |       | nama_responden |       | responden_id (FK)  |
| email       |       | periode_id (FK)|       | tanggal_penilaian  |
| password    |       | user_id (FK)   |       | created_at         |
| created_at  |       | created_at     |       | updated_at         |
+-------------+       +----------------+       +--------------------+
       |                      |
       |                      |
+-------------+       +-------+
|  periodes   |
+-------------+
| id (PK)     |
| nama_periode|
| status      |
| created_at  |
+-------------+

+---------------------+                             +-----------------------+
|     pertanyaans     |                             |   penilaian_details   |
+---------------------+                             +-----------------------+
| id (PK)             |<----------------------------| id (PK)               |
| kategori_id (FK)    |                             | penilaian_id (FK)     |
| pertanyaan          |                             | pertanyaan_id (FK)    |
| created_at          |                             | jawaban (1-5)         |
+---------------------+                             | created_at            |
        |                                           +-----------------------+
        |
+-------------+
|  kategoris  |
+-------------+
| id (PK)     |
| nama_kategori|
| created_at  |
+-------------+
```

### Table Details

#### 1. **users**
Stores user/respondent data.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| name | VARCHAR | User full name |
| email | VARCHAR | Unique email address |
| password | VARCHAR | Encrypted password |
| email_verified_at | TIMESTAMP | Email verification |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 2. **periodes**
Stores survey periods/cycles.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| nama_periode | VARCHAR | Period name |
| status | VARCHAR | Active/Inactive |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 3. **kategoris**
Stores question categories.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| nama_kategori | VARCHAR | Category name |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 4. **pertanyaans**
Stores survey questions.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| kategori_id | INT (FK) | Category reference |
| pertanyaan | TEXT | Question text |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 5. **respondens**
Tracks survey respondents.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| user_id | INT (FK) | User reference |
| periode_id | INT (FK) | Period reference |
| nama_responden | VARCHAR | Respondent name |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 6. **penilaians**
Main assessment/survey session table.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| responden_id | INT (FK) | Respondent reference |
| tanggal_penilaian | DATE | Assessment date |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 7. **penilaian_details**
Stores individual question answers.

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Primary key |
| penilaian_id | INT (FK) | Assessment reference |
| pertanyaan_id | INT (FK) | Question reference |
| jawaban | INT | Rating (1-5) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

---

## 🔐 Environment Variables

### Backend (.env)

```dotenv
# Application Settings
APP_NAME=Survey-360
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey_app
DB_USERNAME=root
DB_PASSWORD=

# Logging
LOG_CHANNEL=stack

# Broadcasting
BROADCAST_DRIVER=log

# Cache & Queue
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"

# AWS S3 (if needed)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

# Pusher (if needed)
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

### Frontend (.env)

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Survey-360
VITE_APP_VERSION=1.0.0
```

---

## 👨‍💻 Development

### Running Both Frontend and Backend

It's recommended to run both in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd survey-app
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Frontend Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Backend Commands

```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear

# Clear config cache
php artisan config:cache

# Run tests
php artisan test

# Create migration
php artisan make:migration create_table_name

# Create model
php artisan make:model ModelName

# Create controller
php artisan make:controller Api/ControllerName
```

### Hot Module Replacement (HMR)

Frontend uses Vite's HMR for fast refresh during development. Changes are reflected instantly in the browser.

### Database Migrations

To create a new migration:
```bash
php artisan make:migration create_table_name
```

Edit the migration file in `database/migrations/` and run:
```bash
php artisan migrate
```

To rollback:
```bash
php artisan migrate:rollback
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "SQLSTATE[HY000]: General error: 1030"
**Solution:** Check your database connection settings in `.env` file.

```bash
# Test database connection
php artisan tinker
>>> DB::connection()->getPdo();
```

#### Issue 2: "npm ERR! peer dep missing"
**Solution:** Use the `--legacy-peer-deps` flag.

```bash
npm install --legacy-peer-deps
```

#### Issue 3: "Port 8000 already in use"
**Solution:** Use a different port.

```bash
php artisan serve --port=8001
```

#### Issue 4: "Port 5173 already in use"
**Solution:** Use a different port.

```bash
npm run dev -- --port 5174
```

#### Issue 5: "CORS Error"
**Solution:** Ensure Laravel CORS is properly configured in `config/cors.php`.

```php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
```

#### Issue 6: "Authentication token not working"
**Solution:** Ensure you're sending the token in the Authorization header.

```bash
Authorization: Bearer your_token_here
```

#### Issue 7: "Database migration fails"
**Solution:** Check if all prerequisite migrations have run.

```bash
php artisan migrate:status
```

#### Issue 8: "Vite HMR not working"
**Solution:** Check your network settings and firewall. Ensure WebSocket connection is allowed.

### Debug Mode

Enable debug mode in `.env` for detailed error messages:
```dotenv
APP_DEBUG=true
```

### View Logs

Check Laravel logs:
```bash
tail -f storage/logs/laravel.log
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

### Fork & Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/your-username/Survey-360.git
cd Survey-360
```

### Create Feature Branch
```bash
git checkout -b feature/AmazingFeature
```

### Make Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

### Commit Changes
```bash
git add .
git commit -m 'Add some AmazingFeature'
```

### Push to Branch
```bash
git push origin feature/AmazingFeature
```

### Open Pull Request
- Go to the repository on GitHub
- Click "New Pull Request"
- Provide a clear description of your changes
- Wait for review and feedback

### Code Style Guidelines

- Use meaningful variable and function names
- Keep functions small and focused
- Write comments for non-obvious code
- Follow Laravel and React best practices
- Use TypeScript types properly

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

The TailAdmin React template used in this project is also released under the MIT License.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support & Contact

For support, questions, or feedback:

- **Open an Issue**: [GitHub Issues](https://github.com/BintangFauzan/Survey-360/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BintangFauzan/Survey-360/discussions)
- **Email**: Contact the repository owner

---

## 🎓 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

### Backend
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Eloquent ORM](https://laravel.com/docs/eloquent)
- [Laravel API Resources](https://laravel.com/docs/eloquent-resources)

### Database
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Database Design Patterns](https://en.wikipedia.org/wiki/Database_model)

---

## 📊 Project Statistics

- **Total Languages**: 6
- **Frontend Size**: ~35 MB (including node_modules)
- **Database**: 7 main tables
- **API Endpoints**: 20+
- **Last Updated**: June 2026

---

## 🙏 Acknowledgments

- [TailAdmin](https://tailadmin.com) - React Dashboard Template
- [Laravel Community](https://laravel.com) - Web Framework
- [React Team](https://react.dev) - UI Library
- All contributors and supporters

---

**Happy Coding! 🚀**

For the latest updates, please visit the [GitHub Repository](https://github.com/BintangFauzan/Survey-360)
