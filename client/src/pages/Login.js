import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', { email, password });

      localStorage.setItem('token', res.data.token);
      setStatus('✅ Вхід успішний!');
      navigate('/journal');
    } catch (err) {
      setStatus('❌ Невірний логін або пароль');
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-md mx-auto bg-[#fff9f7] p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5E2B2B]">Вхід</h2>

        <label className="block mb-2 font-medium text-[#5E2B2B]">Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-[#d8b4a0] rounded-md px-4 py-2 mb-4 focus:outline-none"
        />

        <label className="block mb-2 font-medium text-[#5E2B2B]">Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-[#d8b4a0] rounded-md px-4 py-2 mb-6 focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#7c2d2d] text-white font-semibold py-3 rounded-md hover:bg-[#5e2b2b] transition"
        >
          Увійти
        </button>

        {status && <p className="mt-6 text-center font-semibold text-[#5E2B2B]">{status}</p>}
      </div>
    </div>
  );
}

export default Login;
