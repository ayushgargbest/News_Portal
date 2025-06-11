import React, { useState } from 'react';
import axios from 'axios';
const AddNews = () => {
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/api/news', formData,
        {
          headers:{Authorization: `Bearer ${token}`,},
        }
      );
      alert('News added successfully!');
      setFormData({title:'',content:'',imageUrl:''});
    } 
    catch(err)
    {
      console.error(err);
      alert('Failed to add news. Make sure you are a reporter.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Add News Article</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500"
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500 h-32"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-red-500"
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Submit News
        </button>
      </form>
    </div>
  );
};
export default AddNews;