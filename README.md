# 📝 Todo App with Email Reminders

> A full-stack MERN application for task management with automated email reminders - Built as part of an internship assignment.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Email Reminder System](#email-reminder-system)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 About

This is a **full-stack task management application** where users can:
- Create, update, and delete tasks
- Set due dates for tasks
- Receive **automated email reminders** 30 minutes before task due time
- Manage tasks securely with JWT authentication

Built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with a focus on security, scalability, and user experience.

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints

### ✅ Task Management
- Create tasks with title, description, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks as completed/pending
- View all tasks in a clean dashboard

### 📧 Email Reminders
- Automated email reminders sent **30 minutes before** task due time
- Beautiful HTML email templates
- Real email via **Gmail SMTP** or simulation mode
- Background job processing with **node-cron**

### 🎨 User Interface
- Modern, responsive design
- Clean and intuitive interface
- Real-time updates
- Loading states and error handling
- Animated components

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **node-cron** | Task scheduler |
| **Nodemailer** | Email sending |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI library |
| **Vite** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **CSS3** | Styling |

---

## 📁 Project Structure

```
todo-app-with-reminders/
│
├── backend/                    # Backend application
│   ├── src/
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── User.js        # User model
│   │   │   └── Task.js        # Task model
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js  # Authentication endpoints
│   │   │   └── taskRoutes.js  # Task CRUD endpoints
│   │   ├── middleware/        # Custom middleware
│   │   │   └── authMiddleware.js  # JWT verification
│   │   ├── services/          # Business logic
│   │   │   └── emailService.js    # Email sending logic
│   │   ├── jobs/              # Background jobs
│   │   │   └── reminderScheduler.js  # Cron job for reminders
│   │   └── index.js           # Entry point
│   ├── .env.example           # Environment variables template
│   └── package.json           # Dependencies
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   └── Dashboard.jsx  # Main dashboard
│   │   ├── components/        # Reusable components
│   │   │   ├── TaskForm.jsx   # Task creation/edit form
│   │   │   └── TaskList.jsx   # Task list display
│   │   ├── config/            # Configuration
│   │   │   └── api.js         # Axios setup
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   ├── .env.example           # Environment variables template
│   └── package.json           # Dependencies
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free cloud database - locally)
- **Gmail Account** (Optional - for real email reminders)

### Verify Installation

```bash
node --version    # Should show v14 or higher
npm --version     # Should show 6.x or higher
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/rawooldipesh/ToDo-APP.git
cd ToDo-APP
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your actual values (see Environment Variables section)
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend folder (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env if needed (usually no changes required for local dev)
```

---

## 🔐 Environment Variables

### Backend Configuration (`backend/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Connection
# Option 1: Local MongoDB
MONGO_URI=mongodb://localhost:27017/todo-app

# Option 2: MongoDB Atlas (Recommended)
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Email Configuration (Optional - leave empty for simulation mode)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your.email@gmail.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173
```

#### 📧 Gmail Setup (For Real Emails)

1. **Enable 2-Factor Authentication**:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter: "Todo App"
   - Copy the 16-character password
   - Paste in `EMAIL_PASS` (remove spaces!)

3. **Leave email fields empty** to use simulation mode (emails logged to console)

### Frontend Configuration (`frontend/.env`)

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running Locally

### Method 1: Using Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Email service configured with real SMTP (or SIMULATION mode)
🚀 Server running on port 5000
✅ MongoDB Connected
⏰ Reminder scheduler started (runs every minute)
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ❌ |

**Register/Login Request Body:**
```json
{
  "name": "John Doe",        // Register only
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Routes (All require authentication)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks/:id` | Get single task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |
| PATCH | `/api/tasks/:id/complete` | Toggle completion | ✅ |

**Task Request Body:**
```json
{
  "title": "Complete assignment",
  "description": "Finish the todo app",
  "dueDate": "2024-11-01T14:30:00.000Z"
}
```

---

## 📧 Email Reminder System

### How It Works

1. **Scheduler runs every minute** checking for upcoming tasks
2. **Finds tasks** with due date in next 30 minutes
3. **Sends email reminder** to task owner
4. **Marks reminder as sent** to prevent duplicates

### Testing Reminders

1. **Create a task** with due date 32 minutes in the future
2. **Wait ~30 minutes**
3. **Check**:
   - Your email inbox (if real email configured)
   - Backend console logs (always shows activity)

### Console Output Example

```
📧 ========== EMAIL REMINDER ==========
Mode: ✅ REAL EMAIL (SMTP)
To: user@example.com
Subject: ⏰ Reminder: Complete assignment
Task: Complete assignment
Description: Finish the todo app
Due: Friday, November 1, 2024 at 02:30 PM
======================================

✅ Real email sent successfully!
   Message ID: <abc123@gmail.com>
```

---

## 📸 Screenshots

### Login Page
![Login Screenshot](./screenshots/login.png)

### Register Page
![Register Screenshot](./screenshots/register.png)

### Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### Task Creation
![Task Form Screenshot](./screenshots/task-form.png)

### Email Reminder
![Email Screenshot](./screenshots/email-reminder.png)

---




## 👨‍💻 Development

### Available Scripts

**Backend:**
```bash
npm run dev     # Start with nodemon (auto-restart)
npm start       # Start in production mode
```

**Frontend:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

---


## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is created for educational purposes as part of an internship assignment.

---

## 👤 Author

**Your Name**
- GitHub: [@rawooldipesh](https://github.com/rawooldipesh)
- Email: rawooldipesh0@gmail.com
- LinkedIn: [Dipesh Rawool](https://linkedin.com/in/dipesh-rawool)


---

## 🙏 Acknowledgments

- Assignment provided by [Zeidler group]
- MERN Stack documentation and community
- Node-cron and Nodemailer libraries
- MongoDB Atlas for free database hosting

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the console logs for error messages
3. Open an issue on GitHub
4. Contact: your.email@example.com

---

**Built using MERN Stack**

