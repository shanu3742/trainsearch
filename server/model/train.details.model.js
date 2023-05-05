const { default: mongoose } = require("mongoose");

const trainDetailschema = new mongoose.Schema({
  trainName: {
    type: String,
    require: true,
    unique: true,
  },
  //{source:'',allDestination:[{name:'',ditance:'',price:'',time:'',rating:''}],}
  details: {
    type: Object,
    require: true,
  },
  rating: {
    type: Number,
    default: () => {
      return 4;
    },
  },
  id: {},
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
    trainId: {
      type: [mongoose.Schema.ObjectId],
      ref: "trainlist",
    },
  },
});
module.exports = mongoose.model("trainDetail", trainDetailschema);
