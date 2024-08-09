
# Aoushadhi - E-commerce

**Aoushadhi - Ecommerce** is an e-commerce website designed for daily healthcare and medicinal purposes. It features both user and seller interfaces with a complete frontend and backend development, ensuring a seamless shopping experience and efficient management for sellers.

## Features

### User Side
- **Home Page**: Browse through featured products and promotions.
- **Product Page**: View detailed information about each product.
- **Product Filters**: Filter products based on categories, prices, and other attributes.
- **Cart Page**: View previous orders, add new items, and proceed to checkout.
- **Checkout**: A stepper function to collect shipping details and integrate with Stripe for secure payments.
- **Offers Page**: Check available offers and discounts.
- **Inquiry Page**: Submit inquiries about products or services.
- **User Dashboard**: View and manage personal information and order history.

### Seller Side
- **Product Management**: Add, delete, and update product information.
- **Customer Insights**: View customer purchase history and business statistics.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe

## Repository Links

- **Frontend Repository**: [Ecomm-med](https://github.com/kunalthgr8/Ecomm-med)
- **Backend Repository**: [Ecomm-med-bcknd](https://github.com/kunalthgr8/Ecomm-med-bcknd)

## Environment Variables

Create a `.env` file in the root of the backend repository with the following variables:

```
PORT=8000
MONGODB_URI=
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=7d
STRIPE_PUBLISH_KEY=
STRIPE_SECRET_KEY=
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repositories**:
   ```bash
   git clone https://github.com/kunalthgr8/Ecomm-med.git
   git clone https://github.com/kunalthgr8/Ecomm-med-bcknd.git
   ```

2. **Install Dependencies**:

   For the frontend:
   ```bash
   cd Ecomm-med
   npm install
   ```

   For the backend:
   ```bash
   cd Ecomm-med-bcknd
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   cd Ecomm-med-bcknd
   npm start
   ```

4. **Start the Frontend Application**:
   ```bash
   cd Ecomm-med
   npm start
   ```

5. **Visit the Application**: Open `http://localhost:3000` in your browser to access the application.

## Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
