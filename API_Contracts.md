

## Authentication

### POST /api/auth/register
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### POST /api/auth/login
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

---

## Artworks

### GET /api/artworks
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Sunset Painting",
      "image": "https://cloudinary.com/image.jpg",
      "description": "Beautiful sunset artwork",
      "price": 500,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET /api/artworks/[id]
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Sunset Painting",
    "image": "https://cloudinary.com/image.jpg",
    "description": "Beautiful sunset artwork",
    "price": 500,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Tattoos

### GET /api/tattoos
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Dragon Tattoo",
      "image": "https://cloudinary.com/tattoo.jpg",
      "price": 300,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Enquiries

### POST /api/enquiries
**Request:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "artworkType": "painting",
  "message": "I want to buy this artwork",
  "enquiryImage": "https://cloudinary.com/reference.jpg"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### GET /api/enquiries (Admin only)
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "artworkType": "painting",
      "message": "I want to buy this artwork",
      "enquiryImage": "https://cloudinary.com/reference.jpg",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## Error Response Format
```json
{
  "success": false,
  "error": "Error message here"
}
```