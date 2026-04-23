# 💎 Jewellery E-Commerce Full Stack Project

## 🚀 Live Demo

Frontend: [https://your-vercel-link](https://krishnajewellery.vercel.app)
Backend: [https://your-render-link](https://e-commerce-jewellery-er52.onrender.com)

---

## 📌 Features

* User Authentication (JWT-based login/signup)
* Product Listing
* Add to Cart (persistent)
* Order Management
* Admin Product Management

---

## 🛠️ Tech Stack

* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT, bcrypt

---

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/your-username/repo-name

### 2. Setup Backend

cd server
cp .env.example .env
npm install
npm run dev

### 3. Setup Frontend

cd client
cp .env.example .env
npm install
npm start

---

## 🔑 Environment Variables

### Server (.env)

MONGO_URI=
JWT_SECRET=
CLIENT_URL=

### Client (.env)

REACT_APP_API_URL=

---

## 📌 Notes

* Admin access can be enabled by setting isAdmin=true in MongoDB
# Jewellery MERN Stack Upgrade

This repository now contains a production-ready MERN structure:

## Folder structure

```text
jewellery/
  client/
    src/
      api/
      components/
      context/
      hooks/
      pages/
      routes/
    .env.example
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
    .env.example
```

## Features included

- JWT authentication with bcrypt password hashing
- MongoDB models for `User`, `Product`, `Cart`, and `Order`
- MVC Express APIs for auth, products, cart, and orders
- React auth/cart state with Context API
- Protected checkout and orders pages
- Product search/filter/sort
- Admin-only product creation page
- Deployment-ready environment variable setup

## Notes

- The server seeds default products into MongoDB on first run so the storefront works immediately.
- To use the admin panel, change a user document's `role` to `admin` in MongoDB.
