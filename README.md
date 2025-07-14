# 💬 VoqueChat - Real-Time Chat App

**VoqueChat** is a real-time full-stack chat application built with **React**, **Redux Toolkit**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.
It supports real-time messaging, online status, secure authentication, and responsive design.

🔗 **Live App**: [https://voquechat.onrender.com](https://voquechat.onrender.com)

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login & Signup)
- 💬 Real-Time Messaging using Socket.IO
- ✅ Message Seen & Delivered Indicators
- 🟢 Online/Offline User Status
- 🔄 Redux Toolkit for Global State Management
- 📱 Mobile-Responsive UI with Hamburger Sidebar
- 🌙 Dark-Themed Interface

---

## 🧰 Tech Stack

| Frontend       | Backend           | Real-time     | Database  |
|----------------|-------------------|---------------|-----------|
| React + Vite   | Node.js + Express | Socket.IO     | MongoDB   |
| Redux Toolkit  | JWT Auth          |               | Mongoose  |

---

## 📁 Project Structure
Voquechat_App/
├── client/ # Frontend (React)
└── server/ # Backend (Node.js, Express)


---

## 🔧 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/ritik-kumar123/Voquechat_App.git
cd Voquechat_App
```

2. Backend Setup
    cd server
    npm install
    npm run dev
    Create .env file inside server/:
   ```bash
    PORT=3000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES=2d
    COOKIE_EXPIRES=2
    CLIENT_URL=http://localhost:5173
   ```
3. Frontend Setup
    cd ../client
    npm install
    npm run dev
    Create .env inside client/:
   ```bash
   VITE_DB_URL=https://voquechat.onrender.com/api/v1
   VITE_DB_ORIGIN=https://voquechat.onrender.com
   ```

🌐 Deployment
  . Frontend & Backend are deployed together at:
        ✅ https://voquechat.onrender.com
  . Environment variables are securely configured in Render Dashboard.

## 🙋‍♂️ Author

**Ritik Kumar**  
🔗 [GitHub Profile](https://github.com/ritik-kumar123)


📄 License
This project is licensed under the MIT License.



