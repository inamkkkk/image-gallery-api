# Image Gallery API

This is a Node.js API for managing an online photo gallery.  It supports image uploads, tagging, descriptions, and user authentication via JWT.

## Features

*   **User Authentication:** Register, login, and logout functionality with JWT.
*   **Image Upload:** Upload images to the gallery.
*   **Image Management:** Add descriptions and tags to images.
*   **Image Retrieval:** Retrieve images with optional filtering by tags.
*   **Authorization:** Only authenticated users can upload, update, or delete their images.

## Requirements

*   Node.js (v18 or higher)
*   npm (or yarn)
*   MongoDB

## Installation

1.  Clone the repository:

    
    git clone <repository_url>
    cd image-gallery-api
    

2.  Install dependencies:

    
    npm install
    

3.  Configure environment variables:

    Create a `.env` file in the root directory and add the following variables:

    
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/image_gallery
    JWT_SECRET=your_secret_key
    JWT_EXPIRY=1h
    UPLOAD_DIR=./uploads
    

    *   `PORT`: The port the server will listen on.
    *   `MONGODB_URI`: The MongoDB connection string.
    *   `JWT_SECRET`: A secret key for signing JWTs.
    *   `JWT_EXPIRY`: The expiration time for JWTs (e.g., `1h`, `1d`).
    *   `UPLOAD_DIR`: The directory where uploaded images will be stored.

4.  Start the server:

    
    npm start
    

## API Endpoints

### Authentication

*   `POST /auth/register`: Register a new user.
*   `POST /auth/login`: Log in an existing user.
*   `POST /auth/logout`: Log out a user (invalidates JWT).

### Images

*   `POST /images`: Upload a new image (requires authentication).
*   `GET /images`: Retrieve all images (optional filtering by tags).
*   `GET /images/:id`: Retrieve a specific image by ID.
*   `PUT /images/:id`: Update an image's description and tags (requires authentication, only owner).
*   `DELETE /images/:id`: Delete an image (requires authentication, only owner).

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose
*   jsonwebtoken
*   multer
*   dotenv
*   bcrypt
