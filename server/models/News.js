const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["politics", "business", "technology", "sports", "health", "entertainment",],
      default: "politics",
    },
    imageUrl: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },    
  },
  {
    timestamps: true,
  }
);
module.exports=mongoose.model('News',newsSchema);