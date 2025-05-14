const express = require('express');
const router = express.Router();
const Glucose = require('../models/Glucose');

router.get('/', async (req, res) => {
  try {
    const data = await Glucose.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні даних' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { value, timestamp, period, comment, source } = req.body;
    const entry = new Glucose({
      value,
      timestamp: timestamp || new Date(),
      period,
      comment,
      source: source || 'manual'
    });
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Помилка при збереженні' });
  }
});

app.post('/api/glucose/from-iot', async (req, res) => {
  try {
    const newEntry = new Glucose(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Помилка збереження з IoT' });
  }
});

module.exports = router;
