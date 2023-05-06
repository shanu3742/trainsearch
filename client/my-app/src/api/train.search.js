import axios from "axios";

const fetchTrain = async (trainName) => {
  let config = {
    method: "get",
    url: `http://localhost:4040/train/api/v1/tainname/${trainName}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const fetchTrainByDestination = async (train) => {
  let config = {
    method: "get",
    url: `http://localhost:4040/train/api/v1/trainbetweenstation/${train.source}/${train.destination}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const sortTrainByDestination = async (optionaQuerry, searchByDestination) => {
  let config = {
    method: "get",
    url: `http://localhost:4040/train/api/v1/filter/trainbetweenstation/${searchByDestination.source}/${searchByDestination.destination}?${optionaQuerry}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const getParticularTrain = async (id) => {
  let config = {
    method: "get",
    url: `http://localhost:4040/train/api/v1/tainname/details/${id}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const addParticularTrain = async (formDetails) => {
  let data = JSON.stringify(formDetails);
  console.log(data);
  let config = {
    method: "post",
    url: "http://localhost:4040/train/api/v1/addtrain",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  fetchTrain,
  fetchTrainByDestination,
  sortTrainByDestination,
  getParticularTrain,
  addParticularTrain,
};
