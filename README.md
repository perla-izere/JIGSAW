# 🧩 Jigsaw Puzzle Game

A browser-based jigsaw puzzle game built with Vue 3 + Node/Express + MongoDB Atlas.

## Project Structure

```
/client   → Vue 3 frontend (deployed on Vercel/Netlify)
/server   → Node.js + Express API (deployed on Render/Railway)
```

---

## Local Setup

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier works)

---

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd jigsaw-puzzle
```

---

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/jigsawdb
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

API will be running at `http://localhost:3001`

---

### 3. Client Setup

```bash
cd client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:3001
```

Start the dev server:

```bash
npm run dev
```

App will be running at `http://localhost:5173`

---

## Database Schema

**Collection: `scores`**

```json
{
  "_id": "ObjectId",
  "playerName": "String",
  "score": "Number",
  "time": "Number (seconds)",
  "moves": "Number",
  "difficulty": "String (easy | medium | hard)",
  "date": "Date"
}
```

---

## API Documentation

### `POST /api/scores`

Submit a completed game score.

**Request Body:**
```json
{
  "playerName": "Alice",
  "score": 8450,
  "time": 142,
  "moves": 87,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...savedDocument }
}
```

---

### `GET /api/scores?difficulty=medium`

Retrieve top 10 leaderboard scores.

**Query Params:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| difficulty | string | No | Filter by `easy`, `medium`, or `hard` |

**Response:**
```json
{
  "success": true,
  "data": [ ...top10scores ]
}
```

---

## Deployment

### Frontend → Vercel or Netlify
1. Push `/client` to GitHub
2. Connect repo to Vercel/Netlify
3. Set `VITE_API_URL` to your live API URL in environment variables

### Backend → Render or Railway
1. Push `/server` to GitHub
2. Connect repo, set root directory to `/server`
3. Add `MONGODB_URI` and `CLIENT_ORIGIN` as environment variables

---

## Optional Enhancements Included
- ✅ Three difficulty levels (Easy 3×3, Medium 4×4, Hard 5×5)
- ✅ Timer + moves counter
- ✅ Score calculation
- ✅ Global leaderboard per difficulty
- ✅ Responsive design
