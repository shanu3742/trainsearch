import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addParticularTrain } from "../api/train.search";
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
const TrainForm = ({ openFrom, setOpenForm }) => {
  const [trainDetails, setTrainDetails] = useState({
    trainName: "",
    details: {
      source: "",
      allDestination: [
        // { name: "pune", ditance: 220, price: 110, time: "10:10" },
        // { name: "mumbi", ditance: 250, price: 130, time: "10:10" },
      ],
    },
    rating: Math.floor(Math.random() * 5),
  });
  const [particularDestination, setParticularDestination] = useState({
    name: "",
    ditance: 0,
    price: 0,
    time: "",
  });
  return (
    <Modal
      open={openFrom}
      onClose={() => setOpenForm(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Train
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="form-container">
            <TextField
              id="standard-basic"
              label="Enter train names"
              variant="standard"
              value={trainDetails.trainName}
              onChange={(e) =>
                setTrainDetails((p) => ({ ...p, trainName: e.target.value }))
              }
            />
            <TextField
              id="standard-basic"
              label="Enter train source"
              variant="standard"
              value={trainDetails.details.source}
              onChange={(e) =>
                setTrainDetails((p) => ({
                  ...p,
                  details: { ...p.details, source: e.target.value },
                }))
              }
            />
            <div>
              <h6>add all destination one by one</h6>
              <TextField
                id="standard-basic"
                label="Enter destination  names"
                variant="standard"
                value={particularDestination.name}
                onChange={(e) =>
                  setParticularDestination((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                id="standard-basic"
                label="Enter destination distance"
                variant="standard"
                value={particularDestination.ditance}
                onChange={(e) =>
                  setParticularDestination((p) => ({
                    ...p,
                    ditance: e.target.value,
                    price: +e.target.value * 1.5,
                  }))
                }
              />
              <TextField
                id="standard-basic"
                label="Enter destination time"
                variant="standard"
                value={particularDestination.time}
                onChange={(e) =>
                  setParticularDestination((p) => ({
                    ...p,
                    time: e.target.value,
                  }))
                }
              />
              <Button
                onClick={() =>
                  setTrainDetails((p) => ({
                    ...p,
                    details: {
                      ...p.details,
                      allDestination: [
                        ...p.details.allDestination,
                        particularDestination,
                      ],
                    },
                  }))
                }
              >
                add destinatin details
              </Button>

              <Button
                onClick={() => {
                  addParticularTrain(trainDetails);
                  setOpenForm(false);
                }}
              >
                add tain
              </Button>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default TrainForm;
