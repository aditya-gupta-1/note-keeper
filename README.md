# 📝 Note Keeper App

A full‑stack Note Taking web application built with **React (Vite)** for the frontend and **Express** for the backend. Notes are stored locally in `notes.json`—no external database required.

---

## 📁 Project Structure

```
note-keeper/
├── client/           # React frontend (Vite)
├── server/           # Express backend (Node.js)
├── node_modules/     # Root dev dependencies (concurrently)
├── package.json      # Root scripts to start both services
└── .gitignore
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
# root‑level dev tools
npm install

# frontend & backend deps
npm install --prefix client
npm install --prefix server
```

### 2️⃣ Run development servers

```bash
npm run dev
```

Runs both client and server in parallel via **concurrently**.

| Service      | Port | URL                                            |
| ------------ | ---- | ---------------------------------------------- |
| React (Vite) | 5173 | [http://localhost:5173](http://localhost:5173) |
| Express API  | 3000 | [http://localhost:3000](http://localhost:3000) |

> Visiting `http://localhost:3000/` shows a friendly API message, while the UI lives at `5173` during development.

---

## 🛠️ API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/notes      | List all notes    |
| POST   | /api/notes      | Create a new note |
| DELETE | /api/notes/\:id | Delete note by ID |

Example **POST** body:

```json
{
  "title": "Note 1",
  "body": "This is a note."
}
```

---

## 🔌 Proxy Setup (development)

`client/vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

In React you can simply call:

```js
fetch('/api/notes')
```

No CORS hassles—the dev server forwards it to Express.

---

## 🏠 Root Route in Backend

```js
app.get('/', (req, res) => {
  res.send('Note Keeper API is running. Front‑end: http://localhost:5173');
});
```

---

## 📦 Building for Production

```bash
npm run build --prefix client
```

This outputs static files in `client/dist/`.

`server/server.js` already serves them:

```js
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});
```

After building, simply run your server (e.g., `node server/server.js`) and visit `http://localhost:3000` for the full app.

---

## ✅ .gitignore (essential entries)

```
node_modules/
.env
client/node_modules/
server/node_modules/
*.log
```

---

## 🧠 Tech Stack

* ⚛️ React + Vite
* 🖥️ Node.js + Express
* 📝 Flat‑file storage (`notes.json`)
* 🔁 concurrently + nodemon for DX

---

## 🙌 Author

Aditya Gupta — open to improvements and collaboration!
