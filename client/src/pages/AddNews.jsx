import React, { useState } from "react";
import axios from "axios";

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "politics",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "politics", label: "🏛️ Politics" },
    { value: "business", label: "💼 Business" },
    { value: "technology", label: "💻 Technology" },
    { value: "sports", label: "⚽ Sports" },
    { value: "health", label: "🏥 Health" },
    { value: "entertainment", label: "🎬 Entertainment" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8000/api/news", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("News added successfully!");
      setFormData({
        title: "",
        content: "",
        imageUrl: "",
        category: "politics",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add news. Make sure you are logged in as a reporter.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.value === formData.category
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 Publish News Article
          </h1>
          <p className="text-gray-600">Share your story with the world</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {selectedCategory?.label}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a compelling headline..."
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Article Content
            </label>
            <textarea
              name="content"
              placeholder="Write your news article here..."
              value={formData.content}
              onChange={handleChange}
              rows="10"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-vertical"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL (Optional)
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            {formData.imageUrl && (
              <div className="mt-3">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "🚀 Publish Article"}
            </button>
          </div>

          <div className="text-sm text-gray-500 text-center">
            <p>
              📋 Make sure you're logged in as a reporter to publish articles
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;