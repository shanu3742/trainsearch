import {
  Box,
  Button,
  Drawer,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BsFillTrainFreightFrontFill } from "react-icons/bs";

const TrainDetails = ({ openDrawer, setOpenDrawer, particularTrain }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Drawer
      anchor={"right"}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <div className="drawer-container">
        <div class="train-name">
          <div className="train-icon">
            <BsFillTrainFreightFrontFill />
          </div>
          <div>{particularTrain[0]?.trainName}</div>
        </div>
        <h2>Train Routes</h2>
        <div>
          <Stepper activeStep={activeStep} orientation="vertical">
            {particularTrain[0]?.details?.allDestination?.map((step, index) => (
              <Step key={step.name}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.name} <br /> <b>Time</b>:<span>{step.time}</span>
                  <br />
                  <b>distance:</b>
                  <span>{step.ditance}</span>
                  <br />
                  <b>price:</b>
                  <span>{step.price}</span>
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index ===
                        particularTrain[0]?.details?.allDestination?.length - 1
                          ? "Finish"
                          : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </Drawer>
  );
};

export default TrainDetails;
