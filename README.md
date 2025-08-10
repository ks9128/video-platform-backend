# VidTube - Video Streaming Platform Backend

**A full-featured video streaming platform backend built with Node.js, Express, and MongoDB**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Installation](#️-installation--setup) • [API Documentation](#-api-documentation--testing) • [Contributing](#-contributing)

---

## 📖 Overview

VidTube is a comprehensive video streaming platform backend that enables users to upload, share, and discover videos with rich social features. Built with modern technologies and best practices, it provides a scalable foundation for building video-sharing applications similar to YouTube.

## ✨ Features

### 🔐 Authentication & Security

- **Secure Registration & Login**: JWT-based authentication system
- **Dual Token Strategy**: Access tokens and refresh tokens for enhanced security
- **HTTP-Only Cookies**: Secure session management
- **Password Encryption**: Bcrypt hashing for user passwords

### 🎥 Video Management

- **Full CRUD Operations**: Create, read, update, and delete videos
- **Cloud Storage**: Seamless integration with Cloudinary for video and thumbnail storage
- **Advanced Search**: MongoDB Atlas Search with pagination and sorting

### 👥 Social Features

- **User Subscriptions**: Subscribe to channels and manage subscriptions
- **Interactive Likes**: Polymorphic like system for videos, comments, and tweets
- **Comment System**: Full CRUD operations for comments on videos
- **Micro-blogging**: Tweet-like short content sharing feature

### 📚 Content Organization

- **Personal Playlists**: Create, manage, and organize video collections
- **Channel Management**: User profiles with avatar and cover image support

### 📊 Analytics & Dashboard

- **User Analytics**: Comprehensive statistics including views, likes, and subscribers
- **Content Insights**: Track video performance and engagement metrics

## 🛠️ Tech Stack

| Category           | Technology                |
| ------------------ | ------------------------- |
| **Runtime**        | Node.js                   |
| **Framework**      | Express.js                |
| **Database**       | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT)     |
| **File Upload**    | Multer                    |
| **Cloud Storage**  | Cloudinary                |
| **Validation**     | express-validator         |
| **Environment**    | dotenv                    |

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account or local MongoDB instance
- **Cloudinary** account for media storage

### 1. Clone the Repository

```bash
git clone https://github.com/ks9128/video-platform-backend.git
cd video-platform-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and configure the variables as specified in the `.env.example` file.

### 4. Start the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:8005`

## 📋 API Documentation & Testing

You can use a tool like Postman or Insomnia to test the API endpoints.

### Key API Endpoints

#### 🔐 Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `POST /api/users/refresh-token` - Refresh access token

#### 🎥 Video Management

- `GET /api/videos` - Get all videos
- `POST /api/videos` - Upload a new video
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video details
- `DELETE /api/videos/:id` - Delete video

#### 👥 Social Features

- `POST /api/likes/toggle/:videoId` - Toggle like on video
- `POST /api/comments` - Add comment to video
- `GET /api/comments/:videoId` - Get video comments
- `POST /api/subscriptions/toggle/:channelId` - Toggle subscription

#### 📚 Playlists

- `GET /api/playlists` - Get user playlists
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist

#### 📊 Dashboard

- `GET /api/dashboard/stats` - Get channel statistics
- `GET /api/dashboard/videos` - Get user's videos

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and structure
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the **MIT License**.

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/ks9128/video-platform-backend/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/ks9128/video-platform-backend/discussions)

## 📞 Contact

- **GitHub**: [@ks9128](https://github.com/ks9128)
- **Project Link**: [VidTube Repository](https://github.com/ks9128/video-platform-backend)

---

**⭐ If you found this project helpful, please give it a star on GitHub! ⭐**

Made with ❤️ by Khalid Saifullah