# 🍱 FoodShare – Real-Time Food Donation Platform

A real-time web platform built to bridge the gap between food donors and recipients. Using modern web technologies and live location services, FoodShare enables efficient food distribution with instant notifications and dynamic tracking.

## 🔗 Tech Stack

- **Frontend**: React.js, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **APIs & Services**:
  - Google Maps API (Live food location display)
  - Nodemailer (Email notifications)

## 🚀 Features

- **🍽 Real-Time Food Donation**: Donors can post available food, and recipients can claim it instantly.
- **📍 Live Location Integration**: Google Maps API displays real-time food drop-off and pick-up points.
- **🔒 Secure Authentication**: JWT-based login and signup for both donors and recipients.
- **📬 Email Notifications**: Real-time email alerts when food is claimed using Nodemailer.
- **📊 User Dashboard**: Donors and recipients can track donations, claims, and history with live updates.
- **📦 State Management**: Redux used for efficient handling of global app state.

## 📁 Project Structure

FoodShare/ ├── Frontend/ # React Frontend │ ├── public/ # Static assets │ └── src/ │ ├── components/ # Reusable UI components │ ├── pages/ # Route-specific pages │ ├── redux/ # Redux store, actions, reducers │ ├── App.js # Main App component │ └── index.js # Entry point for React app │ ├── Backend/ # Express Backend │ ├── controllers/ # Request handlers │ ├── models/ # Mongoose schemas/models │ ├── routes/ # API routes │ ├── config/ # DB and mail configuration │ ├── utils/ # Utility/helper functions │ └── server.js # Entry point for Express server │ ├── .env # Environment variables ├── README.md # Project documentation └── package.json # Project metadata and dependencies

Copy
Edit


bash
Copy
Edit

## 🔧 Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/foodshare.git
   cd foodshare
Install Server Dependencies

bash
Copy
Edit
cd server
npm install
Install Client Dependencies

bash
Copy
Edit
cd ../client
npm install
Environment Variables Create a .env file inside the server folder and add the following:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
Run the Application

Start the backend:

bash
Copy
Edit
cd server
npm start
Start the frontend:

bash
Copy
Edit
cd ../client
npm start
