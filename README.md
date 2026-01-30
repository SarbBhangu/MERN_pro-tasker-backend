# Pro-Tasker – Full Stack MERN Application (Backend)

Pro-Tasker is a full-stack project management application built using the MERN stack.  
This repository contains the **backend API**, which handles authentication, authorization, projects, and tasks.

---

##  Features (Backend)

- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes using authentication middleware
- Ownership-based authorization (users can only access their own data)
- Projects CRUD (Create, Read, Update, Delete)
- Tasks CRUD nested under projects
- Task status tracking: `To Do`, `In Progress`, `Done`
- MongoDB Atlas integration
- Clean MVC-style folder structure

---

## 🛠 Tech Stack (Backend)

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **dotenv**
- **Postman** (for API testing)

---

##  Folder Structure

```txt
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── app.js
└── server.js
```
###  Authentication Routes

```http
POST /api/auth/register - Create a new user account
POST /api/auth/login - Authenticate user and return JWT
GET  /api/auth/me - Return logged-in user
```
###  Project Route

```http
POST   /api/projects - Create a new project
GET    /api/projects - Get all projects for logged-in user
GET    /api/projects/:id - Get a single project
PUT    /api/projects/:id - Update a project
DELETE /api/projects/:id - Delete a project
```
###  Task Routes (Nested Under Projects)

```http
POST   /api/projects/:projectId/tasks - Create a task for a project
GET    /api/projects/:projectId/tasks - Get all tasks for a project
PUT    /api/projects/:projectId/tasks/:taskId - Update a task
DELETE /api/projects/:projectId/tasks/:taskId - Delete a task
```