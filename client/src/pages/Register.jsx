import React, { useState } from 'react';
import axios from 'axios';
const Register = () => 
{
  const [formData, setFormData] = useState({name: '', email: '', password: '', role: 'user'});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', formData);
      alert('Registration successful! You can now log in.');
    }
    catch (err) {
      alert('Something went wrong. Email might already be in use.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Register</h2>

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500" required />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500" required />

        <input type="password" name="password" placeholder="Password" value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500" required />

        <select name="role" value={formData.role} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500">
          <option value="user">User</option>
          <option value="reporter">Reporter</option>
        </select>

        <button
          type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;