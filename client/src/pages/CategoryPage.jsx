import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = {
    politics: {
      icon: "🏛️",
      title: "Politics",
      color: "bg-red-800",
      badgeColor: "bg-red-800",
      description: "Latest political news and government updates",
    },
    business: {
      icon: "💼",
      title: "Business",
      color: "bg-red-700",
      badgeColor: "bg-red-700",
      description: "Market trends, finance, and business news",
    },
    technology: {
      icon: "💻",
      title: "Technology",
      color: "bg-red-600",
      badgeColor: "bg-red-600",
      description: "Tech innovations, gadgets, and digital trends",
    },
    sports: {
      icon: "⚽",
      title: "Sports",
      color: "bg-red-500",
      badgeColor: "bg-red-500",
      description: "Sports updates, scores, and athletic news",
    },
    health: {
      icon: "🏥",
      title: "Health",
      color: "bg-red-900",
      badgeColor: "bg-red-900",
      description: "Health tips, medical news, and wellness",
    },
    entertainment: {
      icon: "🎬",
      title: "Entertainment",
      color: "bg-red-400",
      badgeColor: "bg-red-400",
      description: "Movies, music, celebrities, and entertainment",
    },
  };

  const currentCategory = categoryInfo[category] || categoryInfo.politics;

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/news/category/${category}`
        );
        setNews(res.data);
      } catch (e) {
        console.error("Error fetching category news", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryNews();
  }, [category]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-xl text-gray-600">
              Loading {currentCategory.title} news...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className={`${currentCategory.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{currentCategory.icon}</div>
          <h1 className="text-4xl font-bold mb-2">
            {currentCategory.title} News
          </h1>
          <p className="text-xl opacity-90">{currentCategory.description}</p>
          <div className="mt-4 bg-white bg-opacity-20 rounded-full px-4 py-2 inline-block">
            {news.length} articles found
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📰</div>
            <div className="text-2xl text-gray-600 mb-2">
              No {currentCategory.title} news yet
            </div>
            <p className="text-gray-500">
              Be the first to share {currentCategory.title.toLowerCase()} news!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentCategory.badgeColor} text-white`}
                    >
                      {currentCategory.icon} {currentCategory.title}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {item.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span className="text-red-500">❤️</span>
                      <span>{item.likes?.length || 0} likes</span>
                    </span>
                    {item.createdAt && (
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
