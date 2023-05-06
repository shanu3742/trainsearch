import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  addParticularTrain,
  fetchTrain,
  fetchTrainByDestination,
  getParticularTrain,
  sortTrainByDestination,
} from "./api/train.search";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { BsFillTrainFreightFrontFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Drawer, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TrainForm from "./Component/trainForm";
import TrainDetails from "./Component/trainDetails";
import AppHeader from "./Component/header";
import TrainListComponent from "./Component/trainList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function App() {
  const [searchType, setSearchType] = useState("name");
  const [searchByName, setSearchByName] = useState("");
  const [particularTrain, setParticularTrain] = useState([]);
  const [searchByDestination, setsearchByDestination] = useState({
    source: "",
    destination: "",
  });
  const [trainList, setTrainList] = useState([]);
  const [open, setOpen] = useState(false);
  const getTrain = () => {
    fetchTrain(searchByName)
      .then((response) => setTrainList(response))
      .catch((e) => {
        console.log(e);
        setOpen(true);
      });
  };

  const getTrainBySource = () => {
    fetchTrainByDestination(searchByDestination)
      .then((response) => setTrainList(response))
      .catch((e) => {
        console.log(e);
        setOpen(true);
      });
  };

  const sortTrain = (value) => {
    sortTrainByDestination(value, searchByDestination)
      .then((response) => setTrainList(response))
      .catch((e) => {
        console.log(e);
        setOpen(true);
      });
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const viewMore = (value) => {
    getParticularTrain(value.id ?? value._id)
      .then((response) => {
        let data = [...response];
        data[0]["details"]["allDestination"].unshift({
          name: data[0]["details"]["source"],
          ditance: 0,
          price: 0,
          time: "--:--",
        });

        setParticularTrain(data);
      })
      .catch((e) => {
        setOpen(true);
      });
    setOpenDrawer(true);
  };
  console.log(particularTrain);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [openFrom, setOpenForm] = useState(false);
  return (
    <div className="App">
      <TrainForm openFrom={openFrom} setOpenForm={setOpenForm} />
      <div className="post-button">
        <button onClick={() => setOpenForm(true)}>
          <AiFillEdit />
        </button>
      </div>
      <TrainDetails
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        particularTrain={particularTrain}
      />
      <AppHeader
        setSearchType={setSearchType}
        searchType={searchType}
        open={open}
        setOpen={setOpen}
        searchByName={searchByName}
        setSearchByName={setSearchByName}
        getTrain={getTrain}
        searchByDestination={searchByDestination}
        setsearchByDestination={setsearchByDestination}
        getTrainBySource={getTrainBySource}
      />
      <footer className="footer">
        <div className="train-option">
          <p>filter train</p>
          <div className="train-sort-container">
            <div>
              <Button variant="contained" onClick={() => sortTrain("price=2")}>
                low price
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => sortTrain(`rating='high'`)}
              >
                high rated
              </Button>
            </div>
          </div>
        </div>
        <TrainListComponent trainList={trainList} viewMore={viewMore} />
      </footer>
    </div>
  );
}

export default App;
