# Nexsus Frontend (React)

This is the frontend for the Nexsus web application built with React + Vite.

## Description

The app provides a role-based dashboard system for two types of users:

* Regular users:

  * View their dashboard
  * View assigned companies
  * View leads
  * Preview email content
  * Search and filter company/leads data

* Admins:

  * Manage company filters
  * Manage company unique filters
  * Manage locations
  * Manage industries
  * Manage company sizes
  * Manage job titles
  * Add, edit, and delete admin data

Login is included with a role-based flow for `user` and `admin`. The frontend connects to a backend API where the data is managed and stored in PostgreSQL.

## User Requirements

1. Login with a valid email and password.
2. The user role decides which dashboard opens:

   * `user` opens the user dashboard.
   * `admin` opens the admin dashboard.
3. Admin users can:

   * Add, edit, and delete company filters.
   * Add, edit, and delete unique filters.
   * Add, edit, and delete locations.
   * Add, edit, and delete industries.
   * Add, edit, and delete sizes.
   * Add, edit, and delete job titles.
4. Regular users can:

   * View dashboard companies.
   * View companies connected to their account.
   * View leads.
   * Preview email details.
5. The app protects pages using role-based routing.
6. The app stores login session data using `localStorage`.

## Technologies

* React
* Vite
* React Router
* Fetch API
* LocalStorage
* CSS
* Backend API
* PostgreSQL database through the backend

## Getting Started

Clone the repository:

```bash
git clone https://github.com/omar-monayer/Final-React-Front-End.git
```

Go inside the project folder:

```bash
cd Final-React-Front-End
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```bash
src/
├── admin/
│   ├── components/
│   ├── pages/
│   └── styles/
├── auth/
│   ├── ProtectedRoute.jsx
│   └── authService.js
├── layouts/
├── pages/
│   └── Login.jsx
├── user/
│   ├── components/
│   ├── pages/
│   └── styles/
├── App.jsx
└── main.jsx
```

## Main Pages

### User Pages

* Dashboard
* Companies
* Leads

### Admin Pages

* Company Filters
* Company Unique Filters
* Locations
* Industries
* Sizes
* Job Titles
* Add Company Filter
* Add Company Unique Filter
* Add Location
* Add Industry
* Add Size
* Add Job Title

## Notes

Make sure the backend server is running before using the app, because the frontend fetches data from backend API routes.
