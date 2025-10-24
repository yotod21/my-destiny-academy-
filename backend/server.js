import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import { initDb } from './utils/init.js';
import multer from 'multer';
import fs from 'fs';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Safe query helper: replace undefined with null for SQL params
async function query(sql, params = []){
  const safe = params.map(v => v === undefined ? null : v);
  try{
    const conn = await pool.getConnection();
    try{
      const [rows] = await conn.execute(sql, safe);
      return rows;
    } finally {
      conn.release();
    }
  } catch(err){
    console.error('Database error:', err);
    throw err;
  }
}

// ------------------ ROUTES ------------------ //
// Posts (blog)
app.get('/api/posts', async (req,res)=>{
  const rows = await query('SELECT * FROM posts ORDER BY created_at DESC');
  res.json(rows);
});
app.post('/api/posts', upload.none(), async (req,res)=>{
  console.log('POST /api/posts body=', req.body);
  const { title, slug, content, author } = req.body;
  if(!title) return res.status(400).json({ error: 'Missing title' });
  await query('INSERT INTO posts (title,slug,content,author) VALUES (?,?,?,?)', [title,slug,content,author]);
  res.json({ msg: 'Created' });
});
app.put('/api/posts/:id', upload.none(), async (req,res)=>{
  const { title, slug, content, author } = req.body;
  const id = req.params.id;
  await query('UPDATE posts SET title=?,slug=?,content=?,author=? WHERE id=?', [title,slug,content,author,id]);
  res.json({ msg: 'Updated' });
});
app.delete('/api/posts/:id', async (req,res)=>{
  const id = req.params.id;
  await query('DELETE FROM posts WHERE id=?', [id]);
  res.json({ msg: 'Deleted' });
});

// Events
app.get('/api/events', async (req,res)=>{
  const rows = await query('SELECT * FROM events ORDER BY date DESC');
  res.json(rows);
});
app.post('/api/events', upload.none(), async (req,res)=>{
  console.log('POST /api/events body=', req.body);
  const { title, date, description } = req.body;
  if(!title) return res.status(400).json({ error: 'Missing title' });
  await query('INSERT INTO events (title,date,description) VALUES (?,?,?)', [title,date,description]);
  res.json({ msg: 'Created' });
});
app.put('/api/events/:id', upload.none(), async (req,res)=>{
  const { title, date, description } = req.body;
  const id = req.params.id;
  await query('UPDATE events SET title=?,date=?,description=? WHERE id=?', [title,date,description,id]);
  res.json({ msg: 'Updated' });
});
app.delete('/api/events/:id', async (req,res)=>{
  const id = req.params.id;
  await query('DELETE FROM events WHERE id=?', [id]);
  res.json({ msg: 'Deleted' });
});

// Gallery
app.get('/api/gallery', async (req,res)=>{
  const rows = await query('SELECT * FROM gallery ORDER BY created_at DESC');
  res.json(rows);
});
app.post('/api/gallery', upload.single('file'), async (req,res)=>{
  console.log('POST /api/gallery body=', req.body, 'file=', req.file && req.file.path);
  let url = req.body.url || null;
  if(req.file) url = '/' + req.file.path.replace(/\\/g,'/');
  const caption = req.body.caption || null;
  await query('INSERT INTO gallery (url,caption) VALUES (?,?)', [url,caption]);
  res.json({ msg: 'Uploaded' });
});
app.delete('/api/gallery/:id', async (req,res)=>{
  const id = req.params.id;
  const rows = await query('SELECT url FROM gallery WHERE id=?', [id]);
  if(rows.length && rows[0].url && rows[0].url.startsWith('/')){
    try{ fs.unlinkSync(rows[0].url.slice(1)); }catch(e){}
  }
  await query('DELETE FROM gallery WHERE id=?', [id]);
  res.json({ msg: 'Deleted' });
});

// Courses
app.get('/api/courses', async (req,res)=>{
  const rows = await query('SELECT * FROM courses ORDER BY created_at DESC');
  res.json(rows);
});
app.post('/api/courses', upload.none(), async (req,res)=>{
  console.log('POST /api/courses body=', req.body);
  const { title, code, description } = req.body;
  if(!title) return res.status(400).json({ error: 'Missing title' });
  await query('INSERT INTO courses (title,code,description) VALUES (?,?,?)', [title,code,description]);
  res.json({ msg: 'Created' });
});
app.put('/api/courses/:id', upload.none(), async (req,res)=>{
  const { title, code, description } = req.body;
  const id = req.params.id;
  await query('UPDATE courses SET title=?,code=?,description=? WHERE id=?', [title,code,description,id]);
  res.json({ msg: 'Updated' });
});
app.delete('/api/courses/:id', async (req,res)=>{
  const id = req.params.id;
  await query('DELETE FROM courses WHERE id=?', [id]);
  res.json({ msg: 'Deleted' });
});

// Announcements
app.get('/api/announcements', async (req,res)=>{
  const rows = await query('SELECT * FROM announcements ORDER BY created_at DESC');
  res.json(rows);
});
app.post('/api/announcements', upload.none(), async (req,res)=>{
  const { title, content } = req.body;
  if(!title) return res.status(400).json({ error: 'Missing title' });
  await query('INSERT INTO announcements (title,content) VALUES (?,?)', [title,content]);
  res.json({ msg: 'Created' });
});
app.delete('/api/announcements/:id', async (req,res)=>{
  const id = req.params.id;
  await query('DELETE FROM announcements WHERE id=?', [id]);
  res.json({ msg: 'Deleted' });
});

//Contact messages
app.post('/api/contact', upload.none(), async (req,res)=>{
  console.log('POST /api/contact body=', req.body);
  const { name, email, subject, body } = req.body;
  if(!name || !email) return res.status(400).json({ error: 'Missing name or email' });
  await query('INSERT INTO messages (name,email,subject,body) VALUES (?,?,?,?)', [name,email,subject,body]);
  res.json({ msg: 'Received' });
});
app.get('/api/messages', async (req,res)=>{
  const rows = await query('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(rows);
});

// Start server
const PORT = process.env.PORT || 5000;
initDb().then(()=>{
  app.listen(PORT, ()=>{
    console.log('🚀 Server running on port', PORT);
    console.log('✅ Connected to MySQL database');
  });
}).catch(err=>{
    console.error('Failed to init DB:', err);
    process.exit(1);
});
