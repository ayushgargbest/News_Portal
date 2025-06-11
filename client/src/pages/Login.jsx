import React, { useState } from 'react';
import axios from 'axios';
const Login=()=>{
  const [formData, setFormData] = useState({email: '',password: ''});
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('http://localhost:8000/api/auth/login', formData);
      localStorage.setItem('token',res.data.token);
      alert('Login Successfull')
    }
    catch(e){
      alert('Invalid Credentials');
    }
  }
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 text-red-600'>Login</h2>
        
        <input name="email" type="email" placeholder='Email' value={formData.email} onChange={handleChange}
        className='w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500'/>

        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500"/>

        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Login</button>
      </form>        
    </div>
  )
}
export default Login;