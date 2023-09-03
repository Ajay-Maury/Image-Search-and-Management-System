# Image Search and Management System - Frontend

This is the frontend application for the Image Search and Management System, built using Vite and TypeScript. This application allows users to register, log in, and perform various image-related actions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Features](#features)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Image List with Search and Pagination](#image-list-with-search-and-pagination)
  - [Image Detail View](#image-detail-view)
  - [Upload Images](#upload-images)
- [Technologies Used](#technologies-used)
- [Project Repository](#project-repository)
- [Deployed Application](#deployed-application)

## Prerequisites

Before you start, make sure you have the following dependencies installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is included with Node.js.
- Yarn (optional): You can use Yarn instead of npm if you prefer.

## Getting Started

1. Clone the repository:

    ```bash
     git clone https://github.com/Ajay-Maury/Image-Search-and-Management-System.git
    ```

2. Navigate to the project folder:

   ```bash
   cd Image-Search-and-Management-System
   ```


3. Install the project dependencies:

   If you're using npm:

   ```bash
   npm install
   ```

   If you're using Yarn:

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   If you're using Yarn:

   ```bash
   yarn dev
   ```

5. Open your web browser and access the application at `http://localhost:5173`.

## Features

### User Registration

- Users can register by providing their email and password.
- Email and password validation is enforced, and users will receive notification messages for invalid inputs.
- If the provided email is already registered, users will be notified that the email is already in use.
- After successful registration, users will be redirected to the login page.

### User Login

- Registered users can log in by providing their email and password.
- Email and password validation is enforced, and users will receive notification messages for invalid credentials.
- Upon successful login, users will be redirected to the home page.
- If the credentials are invalid, users will receive an "Invalid credentials" notification message.

### Image List with Search and Pagination

- Users who are logged in can access the image list page.
- This page displays a grid view of uploaded images.
- Users can search for images by name or description using a case-insensitive search.
- Pagination is implemented to view a limited number of images per page.
- Users can navigate through multiple pages of search results using pagination.

### Image Detail View

- Logged-in users can access the image detail page.
- Users can view detailed information about an image by clicking on it in the image list.
- The image's details, including its title, description, keywords, width, height, size, and tags, are displayed.

### Upload Images

- Logged-in users can access the upload images page.
- Users can upload images by either clicking and selecting them or by dragging and dropping them.
- Uploaded images must be in JPG or PNG format and smaller than 5MB. Otherwise, users will receive notification messages.
- After a successful upload, users can provide a title, description, and optional keywords for the image and save it.

## Technologies Used

- **Vite**: The build tool and development server used to create this application.
- **TypeScript**: The programming language used for type safety.
- **React**: The JavaScript library used for building the user interface.
- **Redux Toolkit**: The state management library used for managing application state.
- **Ant Design**: The UI framework used for building user interface components.
- **Axios**: The HTTP client used for making API requests.
- **Lodash**: The utility library for working with arrays, objects, and more.
- **React Router**: The routing library used for navigation within the application.
- **Validator**: The library used for input validation.

## Project Repository

- [GitHub Repository](https://github.com/Ajay-Maury/Image-Search-and-Management-System)

## Deployed Application

You can access the deployed application at the following URL:

[Image Search and Management System - Live Demo](https://image-search-and-management-system.vercel.app)

Feel free to explore and use the live version of this frontend application for your Image Search and Management System project. If you have any questions or encounter any issues, please refer to the project's documentation or reach out to me.

Happy image management!
```
