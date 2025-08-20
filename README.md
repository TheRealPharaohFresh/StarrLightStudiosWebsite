📸 Photography Booking App

A React + TypeScript + Firebase application for booking professional photography packages.
Includes user authentication, cart management, order storage, and a flexible services system.

🚀 Features

Firebase Integration

Firestore for data storage (bookings, orders, users)

Firebase Authentication for user management

Environment-based configuration

Cart Management (Redux Toolkit)

Add/remove services

Session persistence with sessionStorage

Clear or reset cart

Services & Orders

Predefined photography packages (Bronze, Silver, Gold, Diamond)

Order creation tied to authenticated users

User management (create, delete, and auto-create on first login)

Routing (React Router v6)

Navigation between pages

Conditional navbar rendering

📂 Project Structure
src/
 ┣ 📂 config/
 ┃ ┗ 📜 firebaseConfig.ts   # Firebase setup & connection test
 ┣ 📂 store/
 ┃ ┣ 📜 cartSlice.ts        # Redux slice for cart
 ┃ ┗ 📜 store.ts            # Store setup with session persistence
 ┣ 📂 services/
 ┃ ┣ 📜 mockData.ts         # Photography package mock data
 ┃ ┣ 📜 orderService.ts     # Create & fetch user orders
 ┃ ┗ 📜 userService.ts      # User creation & deletion
 ┣ 📂 utils/
 ┃ ┗ 📜 userUtils.ts        # Auto-create Firestore user if not exists
 ┣ 📂 pages/
 ┃ ┣ 📜 GreetingPage.tsx    # Landing greeting page (no navbar)
 ┃ ┣ 📜 LandingPage.tsx     # Main home page
 ┃ ┣ 📜 Gallery.tsx         # Gallery of photos
 ┃ ┣ 📜 BookingPage.tsx     # Booking form
 ┃ ┣ 📜 RegisterPage.tsx    # User registration
 ┃ ┣ 📜 Login.tsx           # User login
 ┃ ┣ 📜 CheckoutPage.tsx    # Checkout flow
 ┃ ┗ 📜 ShoppingCartPage.tsx# Cart page
 ┣ 📂 components/
 ┃ ┗ 📜 Navbar.tsx          # Top navigation bar
 ┗ 📜 App.tsx               # App entry with routes

📦 Services
Mock Photography Packages (mockData.ts)

Bronze Package – 30 min shoot, 3 images, 1 outfit

Silver Package – 1 hr shoot, 5–8 images, 2 outfits

Gold Package – 2 hr shoot, 10–12 images, 3–4 outfits

Diamond Package – 4 hr shoot, 20+ images, unlimited outfits

🔧 Firebase Services
Order Service

createOrder(userId, orderData) → Saves an order in Firestore with timestamp.

fetchOrdersByUser(userId) → Returns all orders for a specific user.

User Service

createUser(userId, userData) → Adds user to Firestore.

deleteUser(userId) → Removes user from Firestore and Firebase Authentication.

User Utils

createUserIfNotExists(user) → Ensures that a signed-in Firebase user has a corresponding Firestore record (creates one if missing).

🛒 Cart (Redux)

addToCart(item) → Add service to cart.

removeFromCart(id) → Remove service by ID.

clearCart() → Empty the cart.

setCart(items) → Initialize cart (used for persistence).

Session persistence is handled via sessionStorage.

🌐 Routing

Defined in App.tsx using react-router-dom:

/ → GreetingPage (no navbar)

/home → LandingPage

/gallery → Gallery

/booking → BookingPage

/register → RegisterPage

/login → Login

/checkout → CheckoutPage

/cart → ShoppingCart

The Navbar is hidden on / and shown on all other pages.

⚙️ Tech Stack

Frontend: React + TypeScript

Routing: React Router v6

State Management: Redux Toolkit

Backend: Firebase (Firestore + Auth)

Storage: sessionStorage (for cart persistence)

Do you want me to also add a visual route flow diagram (like a simple tree showing / → GreetingPage → Login/Register → Home → …) to the README, or keep it strictly text-based?

You said:
stop , and polish this in the most professional way possible
ChatGPT said:

Perfect — here’s your final polished README in a professional style, cleaned up for GitHub presentation:

📸 Photography Booking App

A full-stack React + TypeScript + Firebase application designed for seamless photography package booking.
Includes user authentication, cart management with persistence, order handling, and a smooth multi-page user experience.

🚀 Features

Authentication & User Management

Firebase Authentication (email/password & OAuth-ready)

Firestore integration for user profiles

Auto-creation of user documents on first login

Booking & Orders

Predefined photography packages (Bronze → Diamond)

Create and fetch user orders from Firestore

Timestamps and structured order data for tracking

Cart System

Redux Toolkit for cart state management

Add, remove, and clear items

Automatic cart persistence via sessionStorage

Modern Routing

React Router v6 for navigation

Conditional navbar rendering

Dedicated routes for booking flow, checkout, and account pages

Developer Friendly

TypeScript interfaces and strict typing

Modular architecture (services, utils, store, components)

Firebase configuration via .env

📂 Project Structure
src/
 ┣ 📂 config/
 ┃ ┗ 📜 firebaseConfig.ts      # Firebase setup & connection check
 ┣ 📂 store/
 ┃ ┣ 📜 cartSlice.ts           # Redux slice for cart state
 ┃ ┗ 📜 store.ts               # Redux store w/ session persistence
 ┣ 📂 services/
 ┃ ┣ 📜 mockData.ts            # Predefined photography packages
 ┃ ┣ 📜 orderService.ts        # Firestore order creation & retrieval
 ┃ ┗ 📜 userService.ts         # Firestore + Auth user management
 ┣ 📂 utils/
 ┃ ┗ 📜 userUtils.ts           # Auto-create Firestore user documents
 ┣ 📂 pages/
 ┃ ┣ 📜 GreetingPage.tsx       # Initial landing screen (no navbar)
 ┃ ┣ 📜 LandingPage.tsx        # Main home page
 ┃ ┣ 📜 Gallery.tsx            # Photo gallery
 ┃ ┣ 📜 BookingPage.tsx        # Booking form & selection
 ┃ ┣ 📜 RegisterPage.tsx       # User registration
 ┃ ┣ 📜 Login.tsx              # Login screen
 ┃ ┣ 📜 CheckoutPage.tsx       # Checkout & payment flow
 ┃ ┗ 📜 ShoppingCartPage.tsx   # Cart review & management
 ┣ 📂 components/
 ┃ ┗ 📜 Navbar.tsx             # Top navigation bar
 ┗ 📜 App.tsx                  # Routing & application entry point

🛒 Cart System (Redux Toolkit)

State Actions

addToCart(item) → Add a service package to the cart

removeFromCart(id) → Remove a package by ID

clearCart() → Empty the cart

setCart(items) → Initialize cart state

Persistence
Cart contents are synced with sessionStorage, allowing users to refresh or return without losing selections.

📦 Services
Photography Packages (mockData.ts)

Bronze – 30 min shoot, 3 images, 1 outfit

Silver – 1 hr shoot, 5–8 images, 2 outfits

Gold – 2 hr shoot, 10–12 images, 3–4 outfits

Diamond – 4 hr shoot, 20+ images, unlimited outfits

Order Service

createOrder(userId, orderData) → Saves a new order to Firestore

fetchOrdersByUser(userId) → Retrieves all user orders

User Service

createUser(userId, userData) → Creates a Firestore user document

deleteUser(userId) → Deletes a user from Firestore & Firebase Auth

User Utilities

createUserIfNotExists(user) → Ensures every authenticated Firebase user has a Firestore record

🌐 Routing Overview

Defined in App.tsx

/ → Greeting Page (no navbar)

/home → Landing Page

/gallery → Gallery

/booking → Booking Page

/register → Register Page

/login → Login Page

/checkout → Checkout Page

/cart → Shopping Cart

Navbar: Hidden on /, displayed elsewhere.

⚙️ Tech Stack

Frontend: React + TypeScript

Routing: React Router v6

State Management: Redux Toolkit

Backend: Firebase (Firestore & Auth)

Persistence: sessionStorage for cart
