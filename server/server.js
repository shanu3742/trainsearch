const express = require("express");
const APP_CONFIG = require("./config/app.config");
const mongoose = require("mongoose");
const DB_CONFIG = require("./config/db.config");
const bodyParser = require("body-parser");
const trainsSearchModel = require("./model/trains.search.model");
const trainDetailsModel = require("./model/train.details.model");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_CONFIG.DB_URL);
const db = mongoose.connection;

dbOninit = async () => {
  //checke db is empty or not
  try {
    const train = await trainsSearchModel.find({});
    if (train.length === 0) {
      let trainObj = {
        trainName: "SHANU",
        source: "PATNA",
        destinationList: ["PATNA", "purnea", "katihar"],
      };
      const firstTrain = await trainsSearchModel.create(trainObj);
      let trainDetails = {
        trainName: "delhi-to-patna",
        details: {
          source: "delhi",
          allDestination: [
            {
              name: "patna",
              ditance: 220,
              price: 110,
              time: "10:10",
            },
            {
              name: "purnea",
              ditance: 190,
              price: 130,
              time: "10:10",
            },
          ],
        },
        rating: 1,
        id: firstTrain._id,
      };

      const getFirsttrainDetais = await trainDetailsModel.create(trainDetails);

      console.log({
        shortDetails: firstTrain,
        fullDetails: getFirsttrainDetais,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "something went wrong",
      errorDetails: e,
    });
  }
};
db.once("open", () => {
  console.log("connected to database");
  dbOninit();
});
db.on("error", () => console.log("something went wrong"));
app.get("/", (req, res) => {
  res.send("listen to server");
});

require("./router/train.search.router")(app);
app.listen(APP_CONFIG.PORT, () => {
  console.log(`srever running at port number ${APP_CONFIG.PORT}`);
});
