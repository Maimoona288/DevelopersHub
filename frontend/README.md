# DevelopersHub Corporation — Full-Stack Agency Platform

A fully functional full-stack web application built as part of the DevelopersHub Internship Program. This platform includes a public-facing agency website and a secure admin panel for managing services, portfolio, blog posts, client inquiries, and meeting bookings.


---

## 📁 Project Structure

```
developershub-platform/
├── client/                  # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/        # API call functions
│   │    
│   ├── .env
│   └── package.json
│
├── server/                  # Backend (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🧰 Tech Stack

### Frontend
- React.js 
-  Tailwind CSS
- Axios (API calls)

### Backend
- Node.js + Express.js
- JWT Authentication
- RESTful API

### Database
- MongoDB 

### Deployment
- Frontend: Vercel 
- Backend:  Railway / Render
- Database: MongoDB Atlas 

---

## ✨ Features

### 👤 User Side
- **Home** — Hero section, services overview, call-to-action
- **About** — Company info and team
- **Services** — Dynamically loaded from the database
- **Portfolio** — Project showcase with categories
- **Blog** — View blog posts with full detail pages
- **Contact Form** — Client inquiries stored in the database
- **Booking System** — Schedule meetings with backend logic

### 🔐 Admin Panel
- Secure admin login (JWT-based authentication)
- Add / Edit / Delete services
- Manage portfolio projects
- Create, update, and delete blog posts
- View and respond to client inquiries
- View all scheduled meetings

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18+)
- npm 
- MongoDB Atlas account
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Maimoona288/DevelopersHub
cd DevelopersHub
```

---

### 2. Backend Setup

```bash
cd backend
npm install
nodemon server.js
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

The API will run at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `client/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```



---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```


---

## 🚢 Deployment

### Frontend (Vercel)

1. Push your `frontend/` folder to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
4. Deploy

### Backend (Render)

1. Push your `backend/` folder to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Set all environment variables from `server/.env`
4. Set build command: `npm install`
5. Set start command: `node index.js` or `npm start`
6. Deploy

---

## 🧪 Testing

To test the API endpoints manually, use:

- Postman  (https://www.postman.com/)
- browser tool
- swagger link   https://your-domain.com/api-docs
---


## 👨‍💻 Author

**Maimoona Shahbaz**  
Full-Stack Development Intern — DevelopersHub Corporation  
GitHub: @Maimoona288 (https://github.com/Maimoona288)  
Email: maimoonashahbaz348@example.com

---

## 📄 License

This project was developed as part of an internship task for **DevelopersHub Corporation** and is intended for evaluation purposes only.