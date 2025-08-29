const axios = require("axios");
const News = require("../models/News");
const addNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const news = await News.create({
      title,
      content,
      imageUrl,
      createdBy: req.user._id,
    });
    res.status(200).json(news);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(newsList);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
const likeNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const userId = req.user._id;
    const news = await News.findById(newsId);
    if (!news) {
      res.status(404).json({ msg: "News not found" });
    }
    const alreadyLiked = news.likes.includes(userId);
    if (alreadyLiked) {
      news.likes = news.likes.filter((id) => {
        id.toString() !== userId.toString();
      });
    } else {
      news.likes.push(userId);
    }
    await news.save();
    res.status(200).json(news);
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
const addComment = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { text } = req.body;
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ msg: "News Not Found" });
    }
    const comment = {
      user: req.user._id,
      text,
    };
    news.comment.unshift(comment);
    await news.save();
    res.status(200).json(news.comment);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const newsList = await News.find({ category })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(newsList);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

const generateAIContent = async (req, res) => {
  try {
    const { prompt, category } = req.body;

    const enhancedPrompt = `You are a professional news writer. Based on the user prompt: "${prompt}", write a detailed ${category} news article.

IMPORTANT: Return content as properly formatted HTML with:
- <h2> for main headlines
- <h3> for subheadings  
- <p> tags for paragraphs
- <strong> for bold text
- <em> for emphasis
- Proper line breaks and structure

Topic: ${prompt}
Category: ${category}`;

    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: enhancedPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }
    );

    let content =
      aiResponse.data.candidates[0].content.parts[0].text ||
      "No content generated.";

    content = content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>");

    if (!content.startsWith("<")) {
      content = `<p>${content}</p>`;
    }

    res.json({ content });
  } catch (e) {
    console.error("Gemini API error:", e.response?.data || e.message);
    res.status(500).json({ msg: "AI generation failed. Please try again." });
  }
};

module.exports = {
  addNews,
  getAllNews,
  likeNews,
  addComment,
  getNewsByCategory,
  generateAIContent,
};
