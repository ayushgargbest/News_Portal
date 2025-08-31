import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/news");
        setNews(res.data);
      } catch (e) {
        console.error("Error fetching data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getPlainTextPreview = (htmlContent, maxLength = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(htmlContent);
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-xl text-gray-600">Loading latest news...</div>
          </div>
        </div>
      </div>
    );
  }

  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="border-b-4 border-red-600 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest News</h1>
          <p className="text-gray-600 pb-4">
            Stay updated with breaking news and stories
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-xl text-gray-600">No news available</div>
            <p className="text-gray-500 mt-2">Be the first to share a story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {featuredNews && (
                <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <div className="relative">
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded z-10">
                      FEATURED
                    </span>
                    {featuredNews.imageUrl && (
                      <img
                        src={featuredNews.imageUrl}
                        alt={featuredNews.title}
                        className="w-full h-80 object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-600 cursor-pointer transition-colors">
                      {featuredNews.title}
                    </h2>

                    <div
                      className="text-gray-700 text-lg leading-relaxed mb-4 prose prose-red max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(featuredNews.content),
                      }}
                    />

                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <span>👁️</span>
                          <span>
                            {Math.floor(Math.random() * 1000) + 100} views
                          </span>
                        </span>
                      </div>
                      {featuredNews.createdAt && (
                        <span>
                          {new Date(
                            featuredNews.createdAt
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )}

              <div className="space-y-6">
                {otherNews.map((item) => (
                  <article
                    key={item._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="md:flex">
                      {item.imageUrl && (
                        <div className="md:w-1/3">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`p-6 ${
                          item.imageUrl ? "md:w-2/3" : "w-full"
                        }`}
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-red-600 cursor-pointer transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-gray-700 mb-4">
                          {getPlainTextPreview(item.content)}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          {item.createdAt && (
                            <span>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  🔥 Trending Now
                </h3>
                <div className="space-y-4">
                  {news.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id}
                      className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded cursor-pointer"
                    >
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 hover:text-red-600 line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  📂 Categories
                </h3>
                <div className="space-y-2">
                  {[
                    "Politics",
                    "Technology",
                    "Sports",
                    "Business",
                    "Health",
                    "Entertainment",
                  ].map((category) => (
                    <div
                      key={category}
                      className="flex justify-between items-center py-2 hover:bg-gray-50 px-2 rounded cursor-pointer"
                    >
                      <span className="text-gray-700 hover:text-red-600">
                        {category}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
