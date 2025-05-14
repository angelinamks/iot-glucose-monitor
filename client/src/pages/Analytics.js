import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const FILTERS = {
  '7': 'Тиждень',
  '14': '2 тижні',
  '30': 'Місяць',
  '90': '3 місяці'
};

function Analytics() {
  const [data, setData] = useState([]);
  const [filterDays, setFilterDays] = useState('30');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/glucose', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error('Помилка завантаження даних', err);
    }
  };

  const getFilteredData = () => {
    const now = new Date();
    const ms = parseInt(filterDays) * 24 * 60 * 60 * 1000;
    const fromDate = new Date(now - ms);
    return data
      .filter(e => new Date(e.timestamp) >= fromDate)
      .map(e => ({
        ...e,
        date: new Date(e.timestamp).toLocaleString()
      }));
  };

  const getAverage = () => {
    const filtered = getFilteredData();
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, e) => acc + e.value, 0);
    return (sum / filtered.length).toFixed(1);
  };

  const getRiskCounts = () => {
    const filtered = getFilteredData();
    const low = filtered.filter(e => e.value < 70).length;
    const high = filtered.filter(e => e.value > 140).length;
    return { low, high };
  };

  const filteredData = getFilteredData();
  const avg = getAverage();
  const risks = getRiskCounts();

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#5E2B2B]">
          Графіки та аналітика
        </h2>

        <div className="flex justify-end mb-6">
          <label className="mr-3 font-medium text-[#5E2B2B]">Період:</label>
          <select
            className="border border-[#d8b4a0] rounded-md px-4 py-2 bg-[#f5e7e1] text-[#5E2B2B] focus:outline-none"
            value={filterDays}
            onChange={(e) => setFilterDays(e.target.value)}
          >
            {Object.entries(FILTERS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="bg-[#fff9f7] p-6 rounded-xl shadow-md mb-8">
          <p className="text-lg text-[#5E2B2B] mb-2"><strong>Середнє значення:</strong> {avg} мг/дл</p>
          <p className="text-lg text-[#5E2B2B] mb-2"><strong>Занизькі значення (&lt;70):</strong> {risks.low}</p>
          <p className="text-lg text-[#5E2B2B]"><strong>Завищені значення (&gt;140):</strong> {risks.high}</p>
        </div>

        <div className="bg-[#fff9f7] p-6 rounded-xl shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[50, 180]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name="Глюкоза" stroke="#7c2d2d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
