# Grocery Shopping Website

This is a practice project designed to create an e-commerce grocery shopping platform. The website includes features like role-based authentication, payment gateway integration, product sorting, and Redux for managing the cart. This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

---

## Features

1. **Role-Based Authentication**: Different user roles (e.g., admin, customer) with specific access rights.
2. **Product Sorting**: Allows users to sort products by categories, price, or relevance.
3. **Payment Gateway Integration**: Integrated with Stripe and Razorpay for secure online payments.
4. **Google Authentication**: Sign up and log in using Google credentials.
5. **Cart Management**: Implemented using Redux for efficient state management.

---

## Technologies Used

### Frontend:
- **React.js**
- **Redux**
- **Axios**
- **Tailwind CSS (optional)**

### Backend:
- **Node.js**
- **Express.js**

### Database:
- **MongoDB (MongoDB Atlas)**

### Payment Gateways:
- **Stripe**
- **Razorpay**

---

### Frontend `.env`:
```
REACT_APP_SERVER_DOMIN = "http://localhost:8000"
REACT_APP_ADMIN_EMAIL = "arjunrajput@gmail.com"
REACT_APP_STRIPE_PUBLIC_KEY = ""
RAZORPAY_KEY_ID = ""
```

### Backend `.env`:
```
MONGODB_URL = ""
FRONTEND_URL = "http://localhost:3000"
REACT_APP_STRIPE_PUBLIC_KEY = ""
RAZORPAY_KEY_ID = ""
RAZORPAY_SECRET = ""
SECRET = ""
CLIENT_ID = ""
CLIENT_SECRET = ""
```

---

## Installation & Setup

### Prerequisites:
- Node.js and npm installed
- MongoDB Atlas account set up

### Steps to Run:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Arjun-1431/Grocerry-website.git
   cd Grocerry-website
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   node server.js
   ```

4. **Access the Website**
   - Open `http://localhost:3000` in your browser for the frontend.
   - The backend runs on `http://localhost:8000`.

---

## Folder Structure

```
Grocerry-website
├── frontend
│   ├── src
│   ├── public
│   ├── .env
│   ├── package.json
│   └── ...
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---
![Screenshot 2024-12-13 160051](https://github.com/user-attachments/assets/6d565733-da22-416f-affa-8c53dfc2e918)
![Screenshot 2024-12-13 160112](https://github.com/user-attachments/assets/32ede65a-8732-4eeb-a3e0-1fc938944ecd)
![Screenshot 2024-12-13 160134](https://github.com/user-attachments/assets/07df28ba-3c5f-4fe9-ad18-4ac8d1beec5c)
![Screenshot 2024-12-13 160146](https://github.com/user-attachments/assets/374e3403-9c30-4d27-9d55-576315696dd3)
![Screenshot 2024-12-13 160315](https://github.com/user-attachments/assets/e650d59c-0627-41f2-99ec-90be8d02bda9)
![Screenshot 2024-12-13 160331](https://github.com/user-attachments/assets/03831fea-915b-4c6b-93a1-bd594bb83bfb)
![Screenshot 2024-12-13 160341](https://github.com/user-attachments/assets/e8a481be-29c8-412f-a5b8-492c6a6382d8)
![Screenshot 2024-12-13 160358](https://github.com/user-attachments/assets/f5091156-ef0d-407d-a3b7-be42531b5326)
![Screenshot 2024-12-13 160409](https://github.com/user-attachments/assets/6d7f4dd9-e1cc-4bda-9f07-82b53f4fa878)
![Screenshot 2024-12-13 160420](https://github.com/user-attachments/assets/7a7965ac-3298-4f20-8fca-feee161498b4)
![Screenshot 2024-12-13 160504](https://github.com/user-attachments/assets/a8b61fe3-b51d-48cc-a028-5e19b82a2c96)
![Screenshot 2024-12-13 160516](https://github.com/user-attachments/assets/eda588e5-66b9-4884-81d0-eff414ff8cb7)
![Screenshot 2024-12-13 160607](https://github.com/user-attachments/assets/e01cbb5a-0ff4-4ab0-b756-659db1828b3b)
![Screenshot 2024-12-13 161445](https://github.com/user-attachments/assets/9169e814-b604-4be4-af13-c55a8ce62517)
