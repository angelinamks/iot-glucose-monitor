const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Glucose = require('./models/Glucose');
const User = require('./models/User');

const app = express();
const PORT = 3000;
const SECRET_KEY = "GLUCOMETER2807";

app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

mongoose.connect('mongodb://localhost:27017/glucose-monitor')
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch(err => console.error('❌ Помилка підключення до MongoDB:', err));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Введіть email і пароль' });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Невірний email або пароль' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Невірний email або пароль' });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/glucose', authenticateToken, async (req, res) => {
  try {
    const readings = await Glucose.find().sort({ timestamp: -1 });
    res.json(readings);
  } catch (err) {
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

app.post('/api/glucose', authenticateToken, async (req, res) => {
  try {
    const { value, timestamp, period, comment, source } = req.body;
    const newEntry = new Glucose({
      value,
      timestamp: timestamp || new Date(),
      period: period || '',
      comment: comment || '',
      source: source || 'manual',
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Помилка збереження даних' });
  }
});

app.post('/api/iot', async (req, res) => {
  try {
    console.log('📡 Отримано запит з пристрою:', req.body);

    const { value } = req.body;
    if (!value) return res.status(400).json({ error: 'Значення глюкози обовʼязкове' });

    const entry = new Glucose({
      value,
      timestamp: new Date(),
      period: '',
      comment: '',
      source: 'iot'
    });

    await entry.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('❌ Помилка IoT-запиту:', err);
    res.status(500).json({ error: 'Помилка збереження з пристрою' });
  }
});

app.post('/api/glucose/from-iot', async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: 'Потрібно передати значення глюкози' });
    }

    const newEntry = new Glucose({
      value: parseFloat(value),
      timestamp: new Date(), 
      period: '',
      comment: 'Від IoT-пристрою',
      source: 'iot',
    });

    await newEntry.save();
    res.status(201).json({ message: 'Запис успішно збережено' });
  } catch (err) {
    console.error('❌ Помилка збереження з IoT:', err);
    res.status(500).json({ error: 'Серверна помилка' });
  }
});

app.listen(PORT, () => console.log(`✅ Сервер запущено на http://localhost:${PORT}`));
