## 📱 Ruwa – Open Source Edition

**Ruwa** is a React Native mobile application designed to empower rural women artisans by helping them access broader markets, manage orders, and grow their economic independence.

---

### 🚀 Project Overview

Ruwa provides an intuitive platform where women producers can:

* Create profiles
* List products with production capacity and prices
* Receive, negotiate, and manage orders
* Sign a quality charter
* Track payment status and financial dues

The app uses **Expo (React Native)** for the frontend and connects to a backend (via API) that can interface with any ERP (e.g., Odoo).

---

### ✨ Main Features

* 🔐 User authentication (sign up / login / password change)
* 🛒 Product management (add, view by category, and track status)
* 📦 Order lifecycle: offering → negotiation → on craft → delivery → history
* 📃 Quality charter validation flow
* 💰 Real-time financial dues tracking
* 🌐 Multilingual support (AR / FR / EN ready)
* ⚙️ Clean and modular React Query + Zustand setup

---


---

### ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-org/ruwa-mobile-app.git
cd ruwa-mobile-app

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# Edit .env and set EXPO_PUBLIC_API_URL

# 4. Run the app
npx expo start
```

---

### 🧲 Environment Variables

Create a `.env` file with the following content:

```
EXPO_PUBLIC_API_URL=https://your-backend-url.com
```

---

### 🤝 Contribution Guide

We welcome contributions! Here’s how to get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/my-feature`)
5. Create a Pull Request

Please follow our coding style and comment your code for clarity. Open issues or discussions before major changes.

---

### 📄 License

This project is open-sourced under the [MIT License](LICENSE).
