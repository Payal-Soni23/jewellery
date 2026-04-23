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

## Backend API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/products` (admin only)
- `POST /api/cart`
- `GET /api/cart/:userId`
- `POST /api/orders`
- `GET /api/orders/:userId`

## Local setup

1. Copy `server/.env.example` to `server/.env`
2. Copy `client/.env.example` to `client/.env`
3. Run `cd server && npm install`
4. Run `cd client && npm install`
5. Start backend with `cd server && npm run dev`
6. Start frontend with `cd client && npm start`

## Sample environment files

Server:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jewellery
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:3000,https://your-vercel-app.vercel.app
```

Client:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment guide

### Backend on Render/Railway

1. Deploy the `server` folder as a Node service
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables from `server/.env.example`
5. Set `CLIENT_URL` to your Vercel frontend URL

### Frontend on Vercel

1. Import the `client` folder as the frontend project
2. Build command: `npm run build`
3. Output directory: `build`
4. Add `REACT_APP_API_URL=https://your-backend-domain/api`
5. Redeploy after the backend URL is live

## Notes

- The server seeds default products into MongoDB on first run so the storefront works immediately.
- To use the admin panel, change a user document's `role` to `admin` in MongoDB.
