# ✅ **Task Manager App**  

**Live Site URL:**  
[🔗 Task Manager](https://task-management-57d33.web.app/)  

---

## 📌 **Project Overview**  
The **Task Manager App** is a **real-time task management system** with Firebase authentication, drag-and-drop functionality, and persistent task storage.  

✔️ **Google Sign-In authentication** using Firebase  
✔️ **Task management** (add, edit, delete, reorder)  
✔️ **Drag & Drop** between "To-Do," "In Progress," and "Done"  
✔️ **Real-time updates** using hello-pangea/dnd
✔️ **Clean & responsive UI** with React & TailwindCSS  
✔️ **Dark mode & task due date indicators** (Bonus)  

---

## 📚 **Table of Contents**  
- [Technology Stack](#-technology-stack)  
- [Core Features](#-core-features)  
- [Installation](#-installation)  
- [Dependencies](#-dependencies)  
- [API Endpoints](#-api-endpoints)  
- [License](#-license)  

---

## 🛠 **Technology Stack**  

### **Frontend (Client-Side)**  
- ⚛️ **React.js** – Component-based UI framework  
- ⚡ **Vite.js** – Fast build tool for React  
- 🎨 **Tailwind CSS** – Modern UI styling  
- 🏗 **hello-pangea/dnd** – Drag-and-drop functionality  

### **Backend (Server-Side)**  
- 🌐 **Node.js** – JavaScript runtime for backend  
- ⚡ **Express.js** – Lightweight API framework  
- 🗄 **MongoDB** – NoSQL database & ODM  
- 🔄 **hello-pangea/dnd** – Real-time updates  

### **Authentication & Security**  
- 🔑 **Firebase Authentication** – Google Sign-In   

---

## ✨ **Core Features**  

### 📋 **Task Management**  
✔️ Add, edit, delete, and reorder tasks  
✔️ Drag & Drop across **To-Do, In Progress, and Done** categories  

### 🔄 **Real-Time Data Persistence**  
✔️ Tasks remain in their last known state even after a refresh  
✔️ **hello-pangea/dnd** for instant updates  

### 🎨 **Modern & Responsive UI**  
✔️ Works on **desktop & mobile devices**  
✔️ **Dark mode toggle** for better user experience  

---

## 🛠 **Installation**  

### **1️⃣ Clone the repository**  
```sh
git clone https://github.com/hossainshofiq/task-manager-app.git
cd task-manager-app
```

### **2️⃣ Install dependencies**  
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**  
Create a `.env` file in the root directory and add:

```
FIREBASE_API_KEY=your_firebase_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the development server**  

#### Backend:  
```sh
cd server
npm install
npm start
```

#### Frontend:  
```sh
cd client
npm install
npm run dev
```

---

## 📦 **Dependencies**  

### **Frontend:**  
```json
{
  "react": "^18.3.1",
  "vite": "^6.0.5",
  "hello-pangea/dnd": "^1.2.0",
  "firebase": "^11.1.0",
  "react-router-dom": "^7.1.1",
  "tailwindcss": "^3.4.17",
  "sweetalert2": "^11.15.10"
}
```

### **Backend:**  
```json
{
  "express": "^4.18.2",
  "mondodb": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
}
```

---

## 📡 **API Endpoints**  

| Method | Endpoint          | Description |
|--------|------------------|-------------|
| **POST**   | `/tasks`         | Add a new task |
| **GET**    | `/tasks`         | Retrieve all tasks for the logged-in user |
| **PUT**    | `/tasks/:id`     | Update a task (title, description, category) |
| **DELETE** | `/tasks/:id`     | Delete a task permanently |

---

## 📜 **License**  
This project is licensed under the MIT License.  

---

💡 **Built with ❤️ by [Md. Ali Hossain Shofiq](https://github.com/hossainshofiq)**
```

---

### 🔹 **Changes & Enhancements:**  
✔️ **Formatted as per your requested style**  
✔️ **Added icons & emojis for better readability**  
✔️ **Divided tech stack into Frontend & Backend**  
✔️ **Improved dependencies listing**  
✔️ **Refined API Endpoints table**  
✔️ **Added missing details like `.env` setup**  

Let me know if you'd like any further changes! 🚀