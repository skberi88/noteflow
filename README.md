# 📝 NoteFlow

**NoteFlow** is a modern, full-stack notes application built using **Next.js**, **React**, **MongoDB**, and **Tailwind CSS**.  
It allows users to create, search, edit, and manage notes with a clean, responsive, and professional user interface.

This project is designed as a portfolio-quality application, demonstrating full-stack development, clean UI design, and scalable architecture.

---

## ✨ Features

- 📝 **Create Notes** – Add notes with a title and content
- ✏️ **Edit Notes** – Inline editing with instant UI updates
- 🗑️ **Delete Notes** – Remove notes seamlessly
- 🔍 **Live Search** – Filter notes by title as you type (client-side)
- 🌙 **Dark / Light Mode** – Smooth theme toggle
- ⚡ **Optimistic UI** – Fast and responsive interactions
- 🎨 **Modern UI** – Gradient backgrounds, hover effects, and polished design
- 📱 **Responsive Design** – Works across desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React 18**
- **Tailwind CSS v3**
- **Google Fonts (Inter / Poppins)**

### Backend
- **Next.js API Routes**
- **MongoDB Atlas**
- **Mongoose**

---

## 📂 Project Structure

```bash
app/
 ├─ api/
 │   └─ notes/
 │       ├─ route.js        # GET & POST notes
 │       └─ [id]/route.js   # PUT & DELETE notes
 ├─ page.js                 # Main UI
 ├─ layout.js               # App layout
 └─ globals.css             # Global styles
lib/
 └─ mongodb.js              # MongoDB connection
models/
 └─ Note.js                 # Mongoose schema
