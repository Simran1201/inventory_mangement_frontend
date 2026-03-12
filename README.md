# Inventory Management System – Frontend

## Overview

The frontend is built using **React.js with Vite and Ant Design**.
It provides a role-based dashboard for Admin and Users.

Users can browse products and place orders, while admins manage inventory and monitor orders.

---

# Tech Stack

- React.js
- Vite
- Ant Design
- React Router
- Axios
- Context / local storage for authentication

---

# Project Structure

```
frontend
│
├── api
│   └── axios.js
│
├── components
│   ├── AppLayout.jsx
│   ├── OrderDetailsModal.jsx
│   └── ErrorBoundary.jsx
│
├── constants
│   ├── api.js
│   └── routes.js
│
├── pages
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── ProductList.jsx
│   ├── Orders.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminProduct.jsx
│   ├── AdminOrders.jsx
│   ├── AdminUsers.jsx
│   └── NotFound.jsx
│
├── routes
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── AuthRedirect.jsx
│
├── services
│   ├── productService.js
│   ├── orderService.js
│   ├── userService.js
│   └── dashboardService.js
│
├── App.jsx
├── main.jsx
└── package.json
```

---

# Install Dependencies

```
npm install
```

---

# Run Frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Environment Variables

Create `.env` file:

```
VITE_API_BASE=http://localhost:5000/api
```

---

# Authentication Flow

```
Login
   ↓
JWT stored in localStorage
   ↓
Axios interceptor adds token to API calls
   ↓
Protected routes verify token
```

---

# Role Based Routing

### Admin

```
Dashboard
Products
Orders
Users
Profile
```

### User

```
Products
My Orders
Profile
```

Routes are protected using:

```
ProtectedRoute
AuthRedirect
```

---

# UI Layout

```
Sidebar
   ↓
Header
   ↓
Content Area
```

Admin dashboard shows:

- Total Users
- Total Products
- Total Orders
- Total Stock
- Recent Orders
- Low Stock Alerts

---

# Order Flow

```
User views products
       ↓
User places order
       ↓
Order created via API
       ↓
Stock updated automatically
```

---

# Features

- Role based dashboard
- Inventory management
- Order management
- User management
- Profile page
- 404 error page
- Order details modal
- Responsive layout

---

# Error Handling

- 404 Page for unknown routes
- Global error boundary
- API error handling

---

# UI Components

Ant Design components used:

- Layout
- Menu
- Table
- Modal
- Form
- Card
- Descriptions
- Avatar
- Result

---

# Future Improvements

- Charts for analytics
- Notifications for low stock
- Pagination & search
- Product image uploads
- Order status tracking
