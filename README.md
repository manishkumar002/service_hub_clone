# Service Hub Clone - Node.js Microservices

A backend microservices project built with Node.js, Express.js, MongoDB, Redis, Docker and GitHub Actions.

## 🚀 Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT Authentication
- Docker
- Docker Compose
- Git
- GitHub
- GitHub Actions
- CI/CD

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
🏗️ Architecture
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
🔌 Services
Service	Port	Purpose
API Gateway	8000	Request routing
Auth Service	8080	Authentication & JWT
Category Service	8081	Category management
Redis	6379	Caching
MongoDB	27017	Database
⚙️ Installation

Clone the project:

git clone https://github.com/manishkumar002/service_hub_clone.git

Go to Backend:

cd service_hub_clone/Backend
📦 Install Dependencies

Gateway:

cd gateway
npm install

Auth Service:

cd ../services/auth-service
npm install

Category Service:

cd ../category-service
npm install
🔐 Environment Variables

Create .env files for the services.

Example:

PORT=8080
MONGO_URL=mongodb://localhost:27017/servicehub
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
JWT_EXPIRES=7d

Do not push real .env files to GitHub.

Add this to .gitignore:

.env
node_modules/

Use .env.example for sharing environment variable names.

▶️ Run Locally

Start Auth Service:

cd services/auth-service
npm run dev

Start Category Service:

cd services/category-service
npm run dev

Start Gateway:

cd gateway
npm run dev

Gateway:

http://localhost:8000

Auth Service:

http://localhost:8080

Category Service:

http://localhost:8081
🔄 API Gateway Flow
Client
  |
  v
API Gateway :8000
  |
  +---- /api/auth/* ------> Auth Service :8080
  |
  +---- /api/category/* --> Category Service :8081

Example:

POST /api/auth/login
GET /api/category/categories
⚡ Redis Caching

Category Service uses Redis for caching.

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

Example Redis key:

categories

Check Redis:

redis-cli
KEYS *
GET categories
🐳 Docker

Build Auth Service:

docker build -t auth-service ./services/auth-service

Run:

docker run -p 8080:8080 auth-service

Check containers:

docker ps

Check images:

docker images

Stop container:

docker stop <container_id>

Remove container:

docker rm <container_id>
🐳 Docker Compose

Start all services:

docker compose up

Build and start:

docker compose up --build

Run in background:

docker compose up -d --build

Check services:

docker compose ps

View logs:

docker compose logs -f

Stop services:

docker compose down
🌐 Docker Networking

When services run inside Docker, use Docker service names for communication.

Example:

REDIS_URL=redis://redis:6379

Not:

REDIS_URL=redis://localhost:6379

Because inside a container, localhost refers to the current container.

🔀 Git Workflow

Check status:

git status

Create branch:

git checkout -b feature/auth

Add changes:

git add .

Commit:

git commit -m "Add auth service"

Push:

git push origin feature/auth

Create Pull Request on GitHub.

🔄 CI/CD Pipeline
Continuous Integration
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
    |
    +---- Run Tests
    |
    +---- Run Lint
    |
    +---- Build
    |
    v
CI Passed
Continuous Deployment
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
⚙️ GitHub Actions

Workflow files:

.github/
└── workflows/
    ├── ci.yml
    └── cd.yml

Basic CI example:

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
🔐 GitHub Secrets

Never store passwords or secret keys directly in code.

Examples:

DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
MONGO_URL
REDIS_URL
JWT_SECRET
SERVER_HOST
SERVER_USER
SERVER_SSH_KEY

Add them in:

GitHub Repository
    ↓
Settings
    ↓
Secrets and variables
    ↓
Actions
🚀 CI/CD Learning Roadmap
Step 1 - Git & GitHub
git add
git commit
git push
git pull
git branch
Pull Request
Merge
Step 2 - GitHub Actions
Workflow
Job
Step
Runner
Trigger
Secrets
Step 3 - CI
Git Push
   ↓
Install
   ↓
Test
   ↓
Lint
   ↓
Build
Step 4 - Docker
Dockerfile
   ↓
Docker Image
   ↓
Docker Container
Step 5 - Docker Compose
Gateway
Auth Service
Category Service
Redis
MongoDB
Step 6 - Docker Hub
GitHub Actions
      ↓
Docker Build
      ↓
Docker Login
      ↓
Docker Push
      ↓
Docker Hub
Step 7 - Production Deployment
GitHub
   ↓
GitHub Actions
   ↓
Test
   ↓
Docker Build
   ↓
Docker Hub
   ↓
Production Server
   ↓
Docker Compose
🎯 Final Goal

The final CI/CD pipeline will be:

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
📚 Learning Objectives

After completing this project, you will understand:

Node.js Microservices
Express.js
REST APIs
API Gateway
JWT Authentication
Service-to-Service Communication
MongoDB
Redis Caching
Docker
Docker Compose
Docker Networking
Git
GitHub
GitHub Actions
CI/CD
Docker Hub
GitHub Secrets
Environment Variables
Production Deployment
