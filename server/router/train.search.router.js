const {
  addNewTrain,
  getTrainByName,
  getTrainDetais,
  getTrainBetweenStation,
  getFilterTrainBetweenStation,
} = require("../controller/train.search.controller");

module.exports = (app) => {
  app.post("/train/api/v1/addtrain", addNewTrain);
  app.get("/train/api/v1/tainname/:trainName", getTrainByName);
  app.get("/train/api/v1/tainname/details/:id", getTrainDetais);
  app.get(
    "/train/api/v1/trainbetweenstation/:sorceStation/:destinationStation",
    getTrainBetweenStation
  );
  app.get("/train/api/v1/trainbetweenstation/details/:id", getTrainDetais);
  //   ?page
  app.get(
    "/train/api/v1/filter/trainbetweenstation/:sorceStation/:destinationStation",
    getFilterTrainBetweenStation
  );
};
