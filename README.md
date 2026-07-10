# 🚩 Feature Flag Management System

A full-stack **Feature Flag Management System** built with **Node.js, Express, TypeScript, MongoDB, React, and Ant Design**.

The application allows organizations to manage feature flags and enables end users to evaluate whether a feature is enabled based on environment, rollout percentage, and organization.

---

# ✨ Features

## Super Admin

- Login
- Create Organizations
- View Organizations
- Approve Organization Admins
- Logout

## Organization Admin

- Signup
- Login (after approval)
- Create Feature Flags
- Edit Feature Flags
- Delete Feature Flags
- View Feature Flags
- Logout

## End User

- Signup
- Login
- Evaluate Feature Flags
- Logout

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- InversifyJS (Dependency Injection)
- JWT Authentication
- Express Validator
- Bcrypt

## Frontend

- React
- TypeScript
- Vite
- Ant Design
- Axios
- React Router DOM

---

# 📂 Project Structure

```
FeatureManagement
│
├── backend
│
└── frontend
    ├── super-admin
    ├── admin
    └── user
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Backend

```bash
cd backend

npm install
```

---

## 3. Configure Environment Variables

Create

```
.env
```

Example

```env
PORT=5000

NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

SUPER_ADMIN_EMAIL=admin@example.com

SUPER_ADMIN_PASSWORD=Admin@123
```

---

## 4. Run Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend

Each frontend is an independent React application.

## Super Admin

```bash
cd frontend/super-admin

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Organization Admin

```bash
cd frontend/admin

npm install

npm run dev
```

Runs on

```
http://localhost:5174
```

---

## End User

```bash
cd frontend/user

npm install

npm run dev
```

Runs on

```
http://localhost:5175
```

---

# 🔑 Login Credentials

## Super Admin

| Email | Password |
|---------|----------|
| admin@example.com | Admin@123 |

---

## Organization Admin

### Create Flow

1. Login as Super Admin
2. Create an Organization
3. Signup as Organization Admin
4. Approve Organization Admin
5. Login

Example

| Email | Password |
|---------|----------|
| ram@OpenAI.com | Ram@1234 |

---

## End User

Signup using

- Name
- Email
- Password
- Organization

Example

| Email | Password |
|---------|----------|
| user1@OpenAI.com | user1@1234 |

---

# 📋 API Modules

## Authentication

- Login
- Signup (Organization Admin)
- Signup (End User)
- Logout
- Current User

---

## Organizations

- Create Organization
- List Organizations
- Get Organization Details

---

## Users

- Pending Users
- Approve User

---

## Feature Flags

- Create Feature Flag
- List Feature Flags
- Update Feature Flag
- Delete Feature Flag
- Get Feature Flag
- Evaluate Feature Flag

---

# 🧪 Feature Evaluation Logic

A feature is enabled only when:

- Feature exists
- Feature is enabled
- Feature belongs to the user's organization
- Feature environment matches the current application environment
- User falls within rollout percentage

Otherwise an appropriate reason is returned such as:

- FEATURE_NOT_FOUND
- FEATURE_DISABLED
- ENVIRONMENT_MISMATCH
- ROLLOUT_EXCLUDED

---

# 👥 Roles

## SUPER_ADMIN

- Manage Organizations
- Approve Organization Admins

---

## ORGANIZATION_ADMIN

- Manage Feature Flags

---

## END_USER

- Evaluate Feature Flags

---

# 📸 Application Flow

```
Super Admin
    │
    ├── Login
    │
    ├── Create Organization
    │
    └── Approve Organization Admin
             │
             ▼
Organization Admin
    │
    ├── Signup
    ├── Login
    └── Manage Feature Flags
             │
             ▼
End User
    │
    ├── Signup
    ├── Login
    └── Evaluate Feature Flags
```

---

# 📌 Notes

- Organization Admin accounts require approval by the Super Admin.
- End Users are created directly and can log in immediately.
- Feature evaluation is organization-specific.
- JWT is used for authentication.
- HTTP-only cookies are used for storing authentication tokens.

---

# 👨‍💻 Author

Nisha Mashhood

Built as a Feature Flag Management System assignment using Clean Architecture, TypeScript, MongoDB, React, and Node.js.