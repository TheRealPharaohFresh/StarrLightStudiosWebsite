📸 Photography Booking App

Book. Shoot. Shine. ✨

A modern React + TypeScript + Firebase application built for professional photographers and their clients. From booking packages to cart management to user authentication—this app streamlines the entire flow with a clean UI and reliable backend.

🚀 What You Get
🔐 Authentication & Users

Firebase Authentication (Email/Password, OAuth-ready)

Auto-create user documents in Firestore on first login

Secure user deletion (Auth + Firestore)

🎟️ Booking & Orders

Predefined photography packages (Bronze → Diamond 💎)

Save & retrieve orders with timestamps

Orders tied directly to authenticated users

🛒 Cart System (Redux Toolkit)

Add, remove, or clear services with ease

State persistence via sessionStorage

Session survives refresh → your cart stays intact

Cart opens as a right-side drawer from the navbar (with a link to the full `/cart` page).

🌍 Navigation

Built with React Router v6

Conditional Navbar (hidden on /, shown everywhere else)

Dedicated flows for booking, checkout, and account pages

👨‍💻 Developer Friendly

Strong TypeScript typing

Modular service-based architecture

Firebase config via .env for safe environment switching

🧪 Tests & CI

Unit/UI tests use Vitest + React Testing Library and live under `src/tests/`.

A GitHub Actions workflow runs tests + build and then deploys to Vercel.

src/
 ┣ 📂 config/
 ┃ ┗ 📜 firebaseConfig.ts       # Firebase setup
 ┣ 📂 redux/
 ┃ ┣ 📜 cartSlice.ts            # Cart state + actions
 ┃ ┗ 📜 store.ts                # Store + sessionStorage persistence
 ┣ 📂 services/
 ┃ ┣ 📜 bookingServices.ts      # Package catalog (Bronze → Diamond)
 ┃ ┣ 📜 orderServices.ts        # Firestore order operations
 ┃ ┗ 📜 userServices.ts         # User management (Firestore + Auth)
 ┣ 📂 utils/
 ┃ ┗ 📜 createUserIfNotExist.ts # Ensure user doc exists
 ┣ 📂 pages/
 ┃ ┣ 📜 GreetingPage.tsx
 ┃ ┣ 📜 LandingPage.tsx
 ┃ ┣ 📜 Gallery.tsx
 ┃ ┣ 📜 BookingPage.tsx
 ┃ ┣ 📜 RegisterPage.tsx
 ┃ ┣ 📜 Login.tsx
 ┃ ┣ 📜 CheckoutPage.tsx
 ┃ ┗ 📜 ShoppingCartPage.tsx
 ┣ 📂 components/
 ┃ ┣ 📜 Navbar.tsx
 ┃ ┗ 📜 CartDrawer.tsx          # Slide-in cart drawer (sidebar)
 ┣ 📂 styles/
 ┃ ┗ 📜 CartDrawer.module.css   # Drawer styles
 ┣ 📂 tests/
 ┃ ┣ 📂 pages/                 # Page tests
 ┃ ┣ 📂 components/            # Component tests
 ┃ ┣ 📂 redux/                 # Slice/store tests
 ┃ ┗ 📜 setupTests.ts          # Test setup (jest-dom, cleanup)
 ┗ 📜 App.tsx                   # Routing & app entry

| Package    | Duration | Images | Outfits | Best For               |
| ---------- | -------- | ------ | ------- | ---------------------- |
| 🥉 Bronze  | 30 min   | 3      | 1       | Quick portraits        |
| 🥈 Silver  | 1 hr     | 5–8    | 2       | Couples & friends      |
| 🥇 Gold    | 2 hr     | 10–12  | 3–4     | Lifestyle shoots       |
| 💎 Diamond | 4 hr     | 20+    | ∞       | Weddings & full events |


🛒 Cart API (Redux Toolkit)

- addToCart(item) → Add a service package

- removeFromCart(id) → Remove by ID

- clearCart() → Empty cart

- setCart(items) → Restore from persistence


🌐 Routing Flow
/              → GreetingPage (no navbar)
/home          → LandingPage
/gallery       → Gallery
/booking       → BookingPage
/register      → RegisterPage
/login         → LoginPage
/checkout      → CheckoutPage
/cart          → ShoppingCartPage


⚙️ Tech Stack

Frontend: React + TypeScript

Routing: React Router v6

State Management: Redux Toolkit

Backend: Firebase (Firestore + Auth)

Persistence: sessionStorage (for cart state)

🧰 Local Dev

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`
- `npm run typecheck`
