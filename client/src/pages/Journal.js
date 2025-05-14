import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FILTER_OPTIONS = {
  '1d': 'Останній день',
  '7d': 'Останній тиждень',
  '14d': '2 тижні',
  '30d': 'Місяць',
  '90d': '3 місяці'
};

function Journal() {
  const [readings, setReadings] = useState([]);
  const [filter, setFilter] = useState('30d');

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const token = localStorage.getItem('token'); // ⬅️ Отримуємо токен
      const res = await axios.get('http://localhost:3000/api/glucose', {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ Передаємо токен
        },
      });
      setReadings(res.data);
    } catch (err) {
      console.error('Помилка завантаження даних', err);
    }
  };

  const applyFilter = (data) => {
    const now = new Date();
    const days = parseInt(filter);
    const msOffset = days * 24 * 60 * 60 * 1000;
    const threshold = new Date(now - msOffset);

    return data.filter(entry => new Date(entry.timestamp) >= threshold);
  };

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#5E2B2B]">
          Журнал показників глюкози
        </h2>

        <div className="flex justify-end mb-6">
          <label className="mr-3 font-medium text-[#5E2B2B]">Фільтр:</label>
          <select
            className="border border-[#d8b4a0] rounded-md px-4 py-2 bg-[#f5e7e1] text-[#5E2B2B] focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {Object.entries(FILTER_OPTIONS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-[#fff9f7] rounded-xl shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-[#7c2d2d] text-white">
              <tr>
                <th className="py-4 px-6 text-left">Дата і час</th>
                <th className="py-4 px-6 text-left">Глюкоза (мг/дл)</th>
                <th className="py-4 px-6 text-left">Період</th>
                <th className="py-4 px-6 text-left">Коментар</th>
              </tr>
            </thead>
            <tbody>
              {applyFilter(readings).length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">Дані відсутні</td>
                </tr>
              ) : (
                applyFilter(readings).map((entry, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#eedbd4] hover:bg-[#fdecea] transition"
                  >
                    <td className="py-3 px-6">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-6">{entry.value}</td>
                    <td className="py-3 px-6">{entry.period || '-'}</td>
                    <td className="py-3 px-6">{entry.comment || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Journal;
