# Mini Event Finder

A full-stack web application for creating and managing events. Users can create events, browse events by location, and manage their event listings.

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads

### Frontend
- React
- Vite
- Context API for state management
- React Router for navigation

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- MongoDB
- Git

## 🛠️ Setup Instructions

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/alokkkxpixel/mini-event-finder.git
cd mini-event-finder
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create a .env file in the backend directory
```bash
cp .env.example .env
```

4. Set up your environment variables in .env

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd ../frontend
npm install
```

2. Create a .env file in the frontend directory
```bash
cp .env.example .env
```

## 🌍 Environment Variables

### Backend (.env.example)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mini-event-finder
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env.example)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Running the Project

### Start Backend Server
```bash
cd backend
npm run dev
```
The server will start on http://localhost:3000

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will be available on http://localhost:5173

## 📚 API Documentation

Detailed API documentation can be found in the [API Documentation Section](#endpoints) below.

## 🤖 AI Tools Used & Challenges Solved

### GitHub Copilot
- Used for generating comprehensive API documentation
- Helped in writing consistent code patterns
- Assisted with type definitions and error handling patterns

### ChatGPT
- Resolved backend error handling issues:
  - Fixed JWT token validation edge cases
  - Improved error messages for better client feedback
  - Debugged MongoDB query optimization issues

### Google Gemini 2.5
- Assisted with frontend development:
  - Implemented responsive design patterns
  - Optimized React component lifecycles
  - Solved state management challenges in Context API
  - Helped with form validation and error handling

## 🎯 Challenges Faced & Solutions

### 1. File Upload Management
**Challenge**: Handling image uploads securely and efficiently
**Solution**: 
- Implemented Cloudinary integration for image storage
- Used Multer for handling multipart form data
- Added file type and size validation

### 2. Authentication Flow
**Challenge**: Managing secure user sessions and token handling
**Solution**:
- Implemented JWT with refresh tokens
- Added secure HTTP-only cookies
- Created middleware for route protection

### 3. State Management
**Challenge**: Managing complex state across multiple components
**Solution**:
- Implemented Context API for global state management
- Created custom hooks for common operations
- Used local storage for persistent data

### 4. Performance Optimization
**Challenge**: Slow loading times for event listings
**Solution**:
- Implemented pagination for event lists
- Added lazy loading for images
- Optimized MongoDB queries with proper indexing

## 🔐 Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected routes with middleware
- Secure file upload validation
- CORS configuration
- HTTP-only cookies

## 🔄 API Endpoints

[Previous API documentation content remains here]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.