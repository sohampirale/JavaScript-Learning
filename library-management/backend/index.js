const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// File paths
const USERS_FILE = path.join(__dirname, 'users.json');
const BOOKS_FILE = path.join(__dirname, 'books.json');

// Helper to read/write JSON
function readJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Auth endpoints
app.post('/api/signup', (req, res) => {
  const { username, password, role } = req.body;
  let users = readJSON(USERS_FILE, []);
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = { username, password, role, borrowed: [] };
  users.push(user);
  writeJSON(USERS_FILE, users);
  res.json({ message: 'Signup successful', user: { username, role } });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  let users = readJSON(USERS_FILE, []);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ username: user.username, role: user.role });
});

// Book endpoints
app.get('/api/books', (req, res) => {
  const books = readJSON(BOOKS_FILE, []);
  res.json(books);
});

app.post('/api/books', (req, res) => {
  // Admin only
  const { title, author } = req.body;
  let books = readJSON(BOOKS_FILE, []);
  const book = { id: Date.now(), title, author, available: true };
  books.push(book);
  writeJSON(BOOKS_FILE, books);
  res.json(book);
});

app.put('/api/books/:id/borrow', (req, res) => {
  const { username } = req.body;
  let books = readJSON(BOOKS_FILE, []);
  let users = readJSON(USERS_FILE, []);
  const book = books.find(b => b.id == req.params.id);
  const user = users.find(u => u.username === username);
  if (!book || !user) return res.status(404).json({ message: 'Not found' });
  if (!book.available) return res.status(400).json({ message: 'Book not available' });
  book.available = false;
  user.borrowed.push(book.id);
  writeJSON(BOOKS_FILE, books);
  writeJSON(USERS_FILE, users);
  res.json({ message: 'Book borrowed' });
});

app.put('/api/books/:id/return', (req, res) => {
  const { username } = req.body;
  let books = readJSON(BOOKS_FILE, []);
  let users = readJSON(USERS_FILE, []);
  const book = books.find(b => b.id == req.params.id);
  const user = users.find(u => u.username === username);
  if (!book || !user) return res.status(404).json({ message: 'Not found' });
  if (!user.borrowed.includes(book.id)) return res.status(400).json({ message: 'Book not borrowed by user' });
  book.available = true;
  user.borrowed = user.borrowed.filter(id => id !== book.id);
  writeJSON(BOOKS_FILE, books);
  writeJSON(USERS_FILE, users);
  res.json({ message: 'Book returned' });
});

// Admin: delete book
app.delete('/api/books/:id', (req, res) => {
  let books = readJSON(BOOKS_FILE, []);
  books = books.filter(b => b.id != req.params.id);
  writeJSON(BOOKS_FILE, books);
  res.json({ message: 'Book deleted' });
});

// Admin: get all users
app.get('/api/users', (req, res) => {
  const users = readJSON(USERS_FILE, []);
  res.json(users.map(u => ({ username: u.username, role: u.role, borrowed: u.borrowed })));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
