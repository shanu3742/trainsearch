const { ObjectId } = require("mongodb");
const trainDetailsModel = require("../model/train.details.model");
const trainsSearchModel = require("../model/trains.search.model");

exports.addNewTrain = async (req, res) => {
  try {
    if (!req.body || !req.body.trainName || !req.body.details) {
      return res.status(400).send({
        message: "400 Bad Request",
      });
    } else {
      let trainDestination = req.body?.details?.allDestination?.map(
        (el) => el.name
      );
      let trainObj = {
        trainName: req.body?.trainName,
        source: req.body?.details?.source,
        destinationList: [req.body?.details?.source, ...trainDestination],
      };
      const train = await trainsSearchModel.create(trainObj);

      const trainDetails = { ...req.body, id: train._id };
      const gettrainDetais = await trainDetailsModel.create(trainDetails);
      res.status(201).send({
        shortDetails: train,
        fullDetails: gettrainDetais,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
      errorDetails: e,
    });
  }
};

exports.getTrainByName = async (req, res) => {
  try {
    let trainName = req.params.trainName;
    const train = await trainsSearchModel.find({ trainName });
    res.status(200).send(train);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
      errorDetails: e,
    });
  }
};
exports.getTrainDetais = async (req, res) => {
  try {
    let id = new ObjectId(req.params.id);
    const train = await trainDetailsModel.find({ id });
    res.status(200).send(train);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
      errorDetails: e,
    });
  }
};
exports.getTrainBetweenStation = async (req, res) => {
  try {
    let sorceStation = req.params.sorceStation;
    let destinationStation = req.params.destinationStation;
    const train = await trainsSearchModel.find({ source: sorceStation });

    //now find destination
    const filterTrain = train.filter((el) =>
      el.destinationList.includes(destinationStation)
    );

    res.status(200).send(filterTrain);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
      errorDetails: e,
    });
  }
};

exports.getFilterTrainBetweenStation = async (req, res) => {
  try {
    let { rating, price } = req.query;
    let sorceStation = req.params.sorceStation;

    let destinationStation = req.params.destinationStation;
    // let trainName = req.params.trainName;

    // let

    // console.log(rating);
    if (rating) {
      const train = await trainDetailsModel.find({
        "details.source": sorceStation,
      });
      let filterDestinationTrain = train
        .filter((el) =>
          el.details.allDestination.find(
            (destination) => destination.name === destinationStation
          )
        )
        .sort((a, b) => b.rating - a.rating);

      let arrayOfObj = filterDestinationTrain.map((el) => {
        return {
          _id: el.id,
          trainName: el.trainName,
          source: el.details?.source,
          destinationList: [...el.details.allDestination.map((e) => e?.name)],
        };
      });
      return res.status(200).send(arrayOfObj);
    } else if (price) {
      const train = await trainDetailsModel
        .find({
          "details.source": sorceStation,
          "details.allDestination.name": destinationStation,
        })
        .sort({ "details.allDestination.price": 1 });
      let arrayOfObj = train.map((el) => {
        return {
          _id: el.id,
          trainName: el.trainName,
          source: el.details?.source,
          destinationList: [...el.details.allDestination.map((e) => e?.name)],
        };
      });

      return res.status(200).send(arrayOfObj);
    } else {
      const train = await trainDetailsModel.find({
        "details.source": sorceStation,
        "details.allDestination.name": destinationStation,
      });
      let arrayOfObj = train.map((el) => {
        return {
          _id: el.id,
          trainName: el.trainName,
          source: el.details?.source,
          destinationList: [...el.details.allDestination.map((e) => e?.name)],
        };
      });

      return res.status(200).send(arrayOfObj);
    }
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
      errorDetails: e,
    });
  }
};
