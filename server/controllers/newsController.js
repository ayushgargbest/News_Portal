const axios = require("axios");
const News = require("../models/News");

const addNews = async (req, res) => {
  try {
    const { title, content, imageUrl, category } = req.body;
    const news = await News.create({
      title,
      content,
      imageUrl,
      category: category || "politics",
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

Write a comprehensive, well-structured news article. Use proper HTML formatting:
- Use <h2> for the main headline if needed
- Use <h3> for subheadings
- Use <p> tags for paragraphs
- Use <strong> for important text
- Use <em> for emphasis
- Make it engaging and informative
- Include relevant details and context
- Write in a professional journalistic style

Do NOT include:
- HTML document structure (no <!DOCTYPE>, <html>, <head>, <body> tags)
- Any markdown formatting
- Code blocks or backticks
- Extra wrapping <p> tags around other elements

Topic: ${prompt}
Category: ${category}

Write the article content directly as clean HTML:`;

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
      .replace(/```[\s\S]*?```/g, "")
      .replace(/```/g, "")
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head>[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
      .replace(/<title>[\s\S]*?<\/title>/gi, "")
      .replace(/<meta[^>]*>/gi, "")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/<p>\s*<h([1-6])>/g, "<h$1>")
      .replace(/<\/h([1-6])>\s*<\/p>/g, "</h$1>")
      .replace(/<p>\s*<p>/g, "<p>")
      .replace(/<\/p>\s*<\/p>/g, "</p>")
      .replace(/\s+/g, " ")
      .trim();

    if (!content.startsWith("<")) {
      content = `<p>${content}</p>`;
    }

    let title = "";
    const titleMatch = content.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/i);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]*>/g, "").trim();
    }

    res.json({
      content: content,
      title: title,
    });
  } catch (e) {
    console.error("Gemini API error:", e.response?.data || e.message);
    res.status(500).json({ msg: "AI generation failed. Please try again." });
  }
};

module.exports = {
  addNews,
  getAllNews,
  getNewsByCategory,
  generateAIContent,
};
