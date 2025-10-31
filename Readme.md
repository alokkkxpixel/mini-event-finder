# Mini Event Finder API Documentation

This document provides detailed information about all the available endpoints in the Mini Event Finder API.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication using a JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### User Management

#### 1. Register User
#### 1. Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
- **Success Response**:
  - **Code**: 201
  - **Content**:
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "id": "user_id",
        "fullname": "John Doe",
        "email": "john@example.com"
    }
}
```
- **Error Response**:
  - **Code**: 400
  - **Content**:
```json
{
    "success": false,
    "message": "Validation error",
    "errors": [
        {
            "field": "email",
            "message": "Valid Email is Required"
        }
    ]
}
```

#### 2. Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "message": "Login successful",
    "token": "jwt_token_here"
}
```
- **Error Response**:
  - **Code**: 401
  - **Content**:
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

#### 3. Logout User
- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Auth Required**: No
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

### Event Management

#### 1. Create Event
- **URL**: `/api/event/create`
- **Method**: `POST`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **Request Body**:
```json
{
    "title": "Summer Music Festival",
    "description": "A fantastic summer music festival with live bands",
    "location": "Central Park, New York",
    "date": "2025-07-15",
    "maxParticipants": 1000,
    "currentParticipants": 0,
    "image": "(file upload)",
    "fileId":"fileId"
}
```
- **Success Response**:
  - **Code**: 201
  - **Content**:
```json
{
    "success": true,
    "message": "Event created successfully",
    "data": {
        "id": "event_id",
        "title": "Summer Music Festival",
        "description": "A fantastic summer music festival with live bands",
        "location": "Central Park, New York",
        "date": "2025-07-15",
        "maxParticipants": 1000,
        "currentParticipants": 0,
        "imageUrl": "path_to_image",
        "fileId":"fileId form imgkit"
    }
}
```
- **Error Response**:
  - **Code**: 400
  - **Content**:
```json
{
    "success": false,
    "message": "Validation error",
    "errors": [
        {
            "field": "title",
            "message": "Title must be at least 4 characters long"
        }
    ]
}
```

#### 2. Get All Events
- **URL**: `/api/event`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "data": [
        {
            "id": "event_id_1",
            "title": "Summer Music Festival",
            "description": "A fantastic summer music festival with live bands",
            "location": "Central Park, New York",
            "date": "2025-07-15",
            "maxParticipants": 1000,
            "currentParticipants": 50,
            "imageUrl": "path_to_image",
            "fileId":"fileId form imgkit"
        }
        // ... more events
    ]
}
```

#### 3. Get Event by Location
- **URL**: `/api/event/filter?location=New York`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Parameters**:
  - `location`: String (min 2 characters)
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "data": [
        {
            "id": "event_id_1",
            "title": "Summer Music Festival",
            "location": "New York",
            // ... other event details
        }
        // ... more events in the location
    ]
}
```
- **Error Response**:
  - **Code**: 400
  - **Content**:
```json
{
    "success": false,
    "message": "location is required"
}
```

#### 4. Get Event by ID
- **URL**: `/api/event/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "data": {
        "id": "event_id",
        "title": "Summer Music Festival",
        "description": "A fantastic summer music festival with live bands",
        "location": "Central Park, New York",
        "date": "2025-07-15",
        "maxParticipants": 1000,
        "currentParticipants": 50,
        "imageUrl": "path_to_image",
        "fileId":"fileId form imgkit"
    }
}
```
- **Error Response**:
  - **Code**: 404
  - **Content**:
```json
{
    "success": false,
    "message": "Event not found"
}
```

#### 5. Delete Event
- **URL**: `/api/event/delete/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
```json
{
    "success": true,
    "message": "Event deleted successfully"
}
```
- **Error Response**:
  - **Code**: 404
  - **Content**:
```json
{
    "success": false,
    "message": "Event not found"
}
```

## Error Responses
All endpoints may return these common error responses:

### Unauthorized
- **Code**: 401
- **Content**:
```json
{
    "success": false,
    "message": "Unauthorized access"
}
```

### Server Error
- **Code**: 500
- **Content**:
```json
{
    "success": false,
    "message": "Internal server error"
}
```
