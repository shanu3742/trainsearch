const { default: mongoose } = require("mongoose");

const trainListSchema = new mongoose.Schema({
  trainName: {
    type: String,
    require: true,
    unique: true,
  },
  source: {
    type: String,
  },
  destinationList: {
    type: [String],
    require: true,
  },
  createAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});
module.exports = mongoose.model("trainlist", trainListSchema);
