# Service Hub Clone — Node.js Microservices

A backend microservices project built with **Node.js, Express.js, MongoDB, Redis, Docker,** and **GitHub Actions**.

---

## 🚀 Technologies

Node.js · Express.js · MongoDB · Mongoose · Redis · JWT Authentication · Docker · Docker Compose · Git · GitHub · GitHub Actions · CI/CD

---

## 📁 Project Structure

```text
service_hub_clone/
└── Backend/
    ├── gateway/
    │   ├── src/
    │   ├── .dockerignore
    │   ├── .env
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── package-lock.json
    │   └── server.js
    │
    ├── services/
    │   ├── auth-service/
    │   │   ├── src/
    │   │   ├── .dockerignore
    │   │   ├── .env
    │   │   ├── Dockerfile
    │   │   ├── docker-compose.yml
    │   │   ├── package.json
    │   │   └── server.js
    │   │
    │   └── category-service/
    │       ├── src/
    │       ├── .dockerignore
    │       ├── .env
    │       ├── Dockerfile
    │       ├── docker-compose.yml
    │       ├── package.json
    │       └── server.js
    │
    ├── .github/
    │   └── workflows/
    │       ├── ci.yml
    │       └── cd.yml
    │
    ├── .gitignore
    ├── README.md
    └── docker-compose.yml
```

---

## 🏗️ Architecture

```text
                         Client
                           |
                           v
                    API Gateway :8000
                           |
             +-------------+-------------+
             |                           |
             v                           v
       Auth Service                Category Service
          :8080                         :8081
             |                           |
             +-------------+-------------+
                           |
                           v
                         Redis
                          :6379
                           |
                           v
                        MongoDB
                         :27017
```

---

## 🔌 Services

| Service           | Port  | Purpose               |
|--------------------|-------|-----------------------|
| API Gateway        | 8000  | Request routing       |
| Auth Service        | 8080  | Authentication & JWT  |
| Category Service   | 8081  | Category management   |
| Redis              | 6379  | Caching               |
| MongoDB            | 27017 | Database              |

---

## ⚙️ Installation

```bash
# Clone the project
git clone https://github.com/manishkumar002/service_hub_clone.git

# Go to Backend
cd service_hub_clone/Backend
```

### 📦 Install Dependencies

```bash
# Gateway
cd gateway
npm install

# Auth Service
cd ../services/auth-service
npm install

# Category Service
cd ../category-service
npm install
```

---

## 🔐 Environment Variables

Create `.env` files for each service.

**Example:**
```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/servicehub
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
JWT_EXPIRES=7d
```

> ⚠️ Do **not** push real `.env` files to GitHub.

Add this to `.gitignore`:
```gitignore
.env
node_modules/
```

Use `.env.example` to share environment variable names safely.

---

## ▶️ Run Locally

```bash
# Start Auth Service
cd services/auth-service
npm run dev

# Start Category Service
cd services/category-service
npm run dev

# Start Gateway
cd gateway
npm run dev
```

| Service           | URL                     |
|--------------------|--------------------------|
| Gateway            | http://localhost:8000   |
| Auth Service       | http://localhost:8080   |
| Category Service   | http://localhost:8081   |

---

## 🔄 API Gateway Flow

```text
Client
  |
  v
API Gateway :8000
  |
  +---- /api/auth/* ------> Auth Service :8080
  |
  +---- /api/category/* --> Category Service :8081
```

**Example:**
```http
POST /api/auth/login
GET  /api/category/categories
```

---

## ⚡ Redis Caching

Category Service uses Redis for caching.

```text
Request
   |
   v
Check Redis
   |
   +---- HIT ------> Return Cached Data
   |
   +---- MISS
           |
           v
        MongoDB
           |
           v
     Store in Redis
           |
           v
        Response
```

**Example Redis key:** `categories`

```bash
redis-cli
KEYS *
GET categories
```

---

## 🐳 Docker

```bash
# Build Auth Service
docker build -t auth-service ./services/auth-service

# Run
docker run -p 8080:8080 auth-service

# Check containers
docker ps

# Check images
docker images

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>
```

---

## 🐳 Docker Compose

```bash
# Start all services
docker compose up

# Build and start
docker compose up --build

# Run in background
docker compose up -d --build

# Check services
docker compose ps

# View logs
docker compose logs -f

# Stop services
docker compose down
```

---

## 🌐 Docker Networking

When services run inside Docker, use **Docker service names** for communication (not `localhost`), because inside a container, `localhost` refers to the current container itself.

```env
# Correct (inside Docker)
REDIS_URL=redis://redis:6379

# Incorrect (inside Docker)
REDIS_URL=redis://localhost:6379
```

---

## 🔀 Git Workflow

```bash
git status
git checkout -b feature/auth
git add .
git commit -m "Add auth service"
git push origin feature/auth
```

Then create a Pull Request on GitHub.

---

## 🔄 CI/CD Pipeline

### Continuous Integration

```text
Developer
    |
    | git push
    v
GitHub
    |
    v
GitHub Actions
    |
    +---- Install Dependencies
    +---- Run Tests
    +---- Run Lint
    +---- Build
    |
    v
CI Passed
```

### Continuous Deployment

```text
Git Push
   |
   v
GitHub Actions
   |
   v
Run Tests
   |
   v
Docker Build
   |
   v
Docker Image
   |
   v
Docker Hub
   |
   v
Production Server
   |
   v
Docker Compose
```

---

## ⚙️ GitHub Actions

Workflow files live in:
```text
.github/
└── workflows/
    ├── ci.yml
    └── cd.yml
```

**Basic CI example (`ci.yml`):**
```yaml
name: CI

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Gateway Dependencies
        working-directory: ./gateway
        run: npm ci

      - name: Install Auth Service Dependencies
        working-directory: ./services/auth-service
        run: npm ci

      - name: Install Category Service Dependencies
        working-directory: ./services/category-service
        run: npm ci

      - name: Run Tests
        run: echo "Run tests here"
```

---

## 🔐 GitHub Secrets

Never store passwords or secret keys directly in code. Add them under:

```text
GitHub Repository → Settings → Secrets and variables → Actions
```

**Common secrets used:**
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `MONGO_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_SSH_KEY`

---

## 🚀 CI/CD Learning Roadmap

| Step | Topic              | Covers                                                       |
|------|---------------------|---------------------------------------------------------------|
| 1    | Git & GitHub        | add, commit, push, pull, branch, PR, merge                   |
| 2    | GitHub Actions      | workflow, job, step, runner, trigger, secrets                |
| 3    | CI                  | push → install → test → lint → build                         |
| 4    | Docker              | Dockerfile → image → container                               |
| 5    | Docker Compose      | gateway, auth-service, category-service, redis, mongodb       |
| 6    | Docker Hub          | build → login → push                                          |
| 7    | Production Deploy   | GitHub → Actions → test → build → push → server → compose     |

---

## 🎯 Final Goal — Full Pipeline

```text
                    Developer
                        |
                        | git push
                        v
                    GitHub
                        |
                        v
               GitHub Actions
                        |
             +----------+----------+
             |                     |
             v                     v
            CI                     CD
             |                     |
       Install/Test          Docker Build
             |                     |
          Build              Docker Push
             |                     |
             v                     v
        CI Success            Docker Hub
                                   |
                                   v
                            Production Server
                                   |
                                   v
                            Docker Compose
                                   |
                  +----------------+----------------+
                  |                |                |
                  v                v                v
               Gateway           Auth           Category
                  |                |                |
                  +----------------+----------------+
                                   |
                          +--------+--------+
                          |                 |
                          v                 v
                        Redis            MongoDB
```

---

## 📚 Learning Objectives

After completing this project, you will understand:

- Node.js Microservices
- Express.js & REST APIs
- API Gateway pattern
- JWT Authentication
- Service-to-Service Communication
- MongoDB & Mongoose
- Redis Caching
- Docker & Docker Compose
- Docker Networking
- Git & GitHub
- GitHub Actions & CI/CD
- Docker Hub
- GitHub Secrets & Environment Variables
- Production Deployment
