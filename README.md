# Instagram Agent with A/B Testing

This project is a simple Instagram Agent web app that helps users generate and post content (Post or Story) using OpenAI AI model and stores the data in a PostgreSQL database. It includes A/B testing to track which AI-generated prompt version performs better.

## 🚀 Features

- **Prompt Input**: Enter a theme or idea for a Post or Story.
- **AI Generation (A/B Test)**: Generates two variations of the content using OpenAI.
- **User Selection**: Choose the preferred option; selection is stored for learning.
- **History**: View past generated content and chosen options.
- **Statistics**: Insight into which prompt templates perform better over time.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite) with shadcn/ui, TailwindCSS, TanStack Query, TanStack Table, TypeScript
- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI Providers**: OpenAI API
- **Validation**: Zod + React-Hook-Form

---

## 📦 Setup Instructions

### 1) Clone the repository

```bash
git clone https://github.com/ctcruz/instagram-agent-ab-test.git
cd instagram-agent-ab-test
```

### 2) Configure environment variables (Docker)

Create two files from the provided examples:

- `api/.env` (copy from `api/.env.example`)
- `web/.env` (copy from `web/.env.example`)

Example values:

**api/.env**

```env
# Database (use the docker service name 'db' as host)
DATABASE_URL="postgresql://iguser:igpass@db:5432/igdb?schema=public"

# Server
PORT=3001
NODE_ENV=production

# OpenAI (required if using OpenAI provider)
OPENAI_API_KEY=sk-xxxxx
OPENAI_MODEL=gpt-4o-mini
```

**web/.env**

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 3) Build and start with Docker Compose

```bash
docker compose up --build -d
```

Services exposed:

- **Frontend (Vite preview)**: http://localhost:3000
- **API (Nest)**: http://localhost:3001
- **PostgreSQL**: localhost:5432 (service name `db` inside the network)

### 4) Run database migrations (inside the API container)

```bash
docker compose exec api npx prisma migrate deploy
```

> If you need to inspect data locally: `docker compose exec api npx prisma studio`

### 5) Seed the database (optional)

```bash
docker compose exec api npx tsx prisma/seed.ts
```

---

## 💻 How to Run Locally (without Docker)

> This is optional. If you are using Docker Compose, you can skip this section.

### Backend

```bash
cd api
npm install
npx prisma generate
npm run start:dev
```

### Frontend (Vite)

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

---

## 🔑 API Key Configuration

- **OpenAI**: Create an account at https://platform.openai.com/ and get your API key.

Add them to `.env` as shown above.

## 🧰 Troubleshooting (Docker)

- **API not reachable from the browser**: ensure `VITE_API_BASE_URL` in `web/.env` is `http://localhost:3001` and the API container is healthy: `docker compose ps`.
- **Migrations not applied**: run `docker compose exec api npx prisma migrate deploy`.
- **OpenAI errors (401/403)**: check keys in `api/.env` and redeploy/restart containers.
- **CORS issues**: enable CORS in NestJS to allow your frontend origin.
- **Logs**: `docker compose logs -f api` or `docker compose logs -f web`.

---

## 🔄 API Endpoints

| Method | Endpoint                    | Description                                   |
| ------ | --------------------------- | --------------------------------------------- |
| POST   | `/api/content/generate`         | Generate two AI content options (A/B)         |
| POST    | `/api/content/{uuid}/select`           | Select preferred option for a generated entry |
| GET    | `/api/content/history`          | Get history of generated content              |
| GET    | `/api/content/insights` | Get prompt template performance stats         |

---

## 📂 Project Structure

##### Backend (NestJS)

```
└── 📁api
    └── 📁prisma
    └── 📁src
        └── 📁application
        └── 📁domain
            └── 📁entities
            └── 📁interfaces
        └── 📁dtos
        └── 📁infra
            └── 📁gateway
            └── 📁http
            └── 📁persistence
                └── 📁prisma
        └── 📁use-cases
```

##### Frontend (React.js)

```
└── 📁web
    └── 📁src
        └── 📁api
            └── 📁endpoints
        └── 📁components
            └── 📁features
            └── layout
            └── 📁ui
        └── 📁contexts
        └── 📁hooks
            └── 📁mutations
            └── 📁queries
        └── 📁lib
        └── 📁pages
        └── 📁providers
        └── 📁types
```

---

## 🌐 Deployment

Deployed app link: **[https://ig-agent-web.onrender.com/](https://ig-agent-web.onrender.com/)**

---

## 📌 Notes

This is a functional prototype for testing AI content generation strategies. Focus is on functionality, clarity, and code quality rather than production-level polish.
