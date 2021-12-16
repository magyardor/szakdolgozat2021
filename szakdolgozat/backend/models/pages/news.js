const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  startDate: {type: Date, required: true, default: Date.now},
  endDate: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('News', newsSchema);
