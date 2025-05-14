import React, { useState } from 'react';
import axios from 'axios';

const PERIOD_OPTIONS = ['ранок', 'обід', 'вечеря', 'перекус', 'перед їжею', 'після їжі'];

function Add() {
  const [value, setValue] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16));
  const [period, setPeriod] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    if (!value || isNaN(value)) {
      setStatus('❌ Введіть коректне значення глюкози');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/glucose',
        {
          value: parseFloat(value),
          timestamp,
          period,
          comment,
          source: 'manual',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus('✅ Дані збережено успішно');
      setValue('');
      setPeriod('');
      setComment('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Помилка при збереженні');
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-2xl mx-auto bg-[#fff9f7] p-8 rounded-2xl shadow-md">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#5E2B2B]">➕ Додавання показників</h2>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#5E2B2B]">Рівень глюкози (мг/дл):</label>
          <div className="flex">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Наприклад, 95"
              className="flex-1 border border-[#d8b4a0] rounded-l-md px-4 py-2 focus:outline-none"
            />
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded-r-md cursor-not-allowed"
            >
              Підвантажити з датчика
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#5E2B2B]">Дата та час вимірювання:</label>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="w-full border border-[#d8b4a0] rounded-md px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#5E2B2B]">Період:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full border border-[#d8b4a0] rounded-md px-4 py-2 bg-[#f5e7e1] text-[#5E2B2B] focus:outline-none"
          >
            <option value="">-- Виберіть період --</option>
            {PERIOD_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-[#5E2B2B]">Коментар:</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Наприклад: після сніданку, почувався добре"
            className="w-full border border-[#d8b4a0] rounded-md px-4 py-2 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#7c2d2d] text-white font-semibold py-3 rounded-md hover:bg-[#5e2b2b] transition"
        >
          Зберегти
        </button>

        {status && (
          <p className={`mt-6 text-center font-semibold ${status.includes('успішно') ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default Add;
