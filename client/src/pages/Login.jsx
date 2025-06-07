import React, { useState } from 'react';
import axios from 'axios';
const Login=({onLogin})=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('http://localhost:8000/api/users/login',{email,password});
      localStorage.setItem(res.data.token);
      onLogin(res.data.user);
    }
    catch(e){
      alert('Invalid Credentials');
    }
  }
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 text-red-600'>Login</h2>
        
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500'/>

        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500"/>

        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Login</button>
      </form>        
    </div>
  )
}
export default Login;