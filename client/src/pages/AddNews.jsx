import React, { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    category: "politics",
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAI, setShowAI] = useState(false);

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

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) {
      alert(
        "Please enter some keywords or description for AI to generate content"
      );
      return;
    }
    setAiLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/news/ai/generate",
        {
          prompt: aiPrompt,
          category: formData.category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData((prev) => ({
        ...prev,
        content: response.data.content,
        title: response.data.title || prev.title,
      }));

      setAiPrompt("");
      setShowAI(false);
    } catch (error) {
      alert("AI generation failed, please try again.");
    } finally {
      setAiLoading(false);
    }
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📝 AI-Powered News Writing
          </h1>
          <p className="text-gray-600">
            Create professional articles with AI assistance
          </p>
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Article Content
              </label>
              <button
                type="button"
                onClick={() => setShowAI(!showAI)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                🤖 AI Writer
              </button>
            </div>

            {showAI && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  🤖 AI Content Generator
                </h3>
                <p className="text-sm text-red-600 mb-3">
                  Describe your news story or enter keywords, and AI will
                  generate a professional article for you!
                </p>
                <textarea
                  placeholder="Example: 'New government policy on renewable energy'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows="3"
                  className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-3"
                />
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={generateAIContent}
                    disabled={aiLoading}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? "🔄 Generating..." : "✨ Generate Article"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAI(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div
              className="w-full p-3 border border-gray-300 rounded-lg prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(formData.content),
              }}
            />
            <div className="mt-2 text-xs text-gray-500">
              💡 Tip: The AI generates HTML with <b>bold</b>, <i>italic</i>, and{" "}
              <u>underline</u>
            </div>
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
        </form>
      </div>
    </div>
  );
};
export default AddNews;