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

## Environment Variables

The project requires the following environment variables. Create a `.env` file in both the frontend and backend directories with the following:

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

## Security Note

- **NEVER** expose your `.env` file or secrets in a public repository.
- Use `.gitignore` to exclude `.env` files from being committed.

---

## Future Enhancements

- Implement advanced filtering and search functionality.
- Add user reviews and product ratings.
- Create a responsive mobile-friendly UI.

---

## License

This project is for practice purposes and is not intended for production use. Feel free to clone and modify it for your learning!

---
