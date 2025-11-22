# E-commerce Immersive Login System

This project demonstrates an immersive login page for an e-commerce site, featuring Email/Password, Google, Meta (Facebook), and Phone Number authentication.

## Technologies
- **Backend**: Java 17, Spring Boot 3.2 (Microservices Architecture)
- **Frontend**: React 18, Vite, Ant Design
- **Database**: MySQL 8.0
- **Search/Index**: Elasticsearch 8.x
- **Containerization**: Docker Compose

## Prerequisites
- Java 17+
- Node.js 18+ & npm
- Docker & Docker Compose

## Setup Instructions

### 1. Database Setup
Start the MySQL and Elasticsearch containers:
```bash
docker-compose up -d
```

### 2. Backend Setup
Navigate to the auth-service directory and run the application:
```bash
cd backend/auth-service
./mvnw spring-boot:run
```
*Note: If `mvnw` is not generated, use your local maven: `mvn spring-boot:run`*

### 3. Frontend Setup
Navigate to the frontend app directory, install dependencies, and start the dev server:
```bash
cd frontend/frontend-app
npm install
npm run dev
```

## API Documentation

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| POST | `/login` | Standard Email/Password login | `{ "email": "...", "password": "..." }` |
| POST | `/google` | Google OAuth login | `{ "token": "google-jwt-token" }` |
| POST | `/meta` | Meta/Facebook OAuth login | `{ "token": "meta-access-token" }` |
| POST | `/phone/otp` | Request OTP for phone login | `{ "phoneNumber": "+1234567890" }` |
| POST | `/phone/verify` | Verify OTP and login | `{ "phoneNumber": "...", "otp": "123456" }` |

## Architecture
- **Frontend**: A React Single Page Application (SPA) using Ant Design for UI components. It communicates with the backend via REST APIs.
- **Backend**: A Spring Boot `auth-service` that handles user authentication and registration.
- **Database**: MySQL stores user data (credentials, profiles).
- **Elasticsearch**: Configured for potential user search/indexing (integrated but not fully utilized in this login demo).
