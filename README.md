# 📋 Todo List Web Application

A simple and dynamic Todo List app built with **Node.js**, **Express**, **MongoDB Atlas**, and **EJS**.

This project allows users to **add, edit, and delete tasks** with priorities like *Urgent*, *High*, and *Low*. Tasks are stored persistently in MongoDB Atlas and displayed dynamically on the frontend.

---

## 🚀 Features

✅ Add new tasks with priority levels  
✅ Edit existing tasks inline  
✅ Delete tasks dynamically  
✅ Alerts for task actions (created, updated, deleted)  
✅ Persistent data storage using MongoDB Atlas  
✅ Responsive and clean UI  

---

## 🛠 Technologies Used

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, HTML, CSS  
- **Database:** MongoDB Atlas (cloud database)  
- **Version Control:** Git & GitHub  

---

## 🗂️ Folder Structure

todo_list/
├── models/
│ └── Task.js # Mongoose schema for tasks
├── public/
│ └── css/
│ └── styles.css # Stylesheet
├── views/
│ └── list.ejs # EJS template
├── index.js # Main server file
├── package.json # Project dependencies
└── .gitignore


---

## 📦 Setup Instructions

### 🔥 Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/sreeshanth1806/todo_list.git
   cd todo_list

npm install

mongoose.connect("YOUR_MONGODB_URI", {...})

node index.js
http://localhost:4000


---

### ✅ What to Do:
1. Save this content as **`README.md`** in your project folder.  
2. Add and commit it:  
   ```bash
   git add README.md
   git commit -m "Added professional README"
   git push origin main


🌐 Deployment on Render
This app is live on Render!

🌟 Steps to Deploy:
Fork this repository (if needed).

Go to Render and log in.

Click “New Web Service” → Connect your GitHub repo.

Fill in:

Build Command: npm install

Start Command: node index.js

Environment: Node

Region: Select closest (e.g., Asia)

Add Environment Variable:

Key: MONGODB_URI

Value: (your MongoDB Atlas connection string)

Click Deploy.

🔗 Live App URL: https://todo-list-on-render.com 