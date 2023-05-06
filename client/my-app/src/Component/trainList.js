import { Button } from "@mui/material";
import React from "react";
import { BsFillTrainFreightFrontFill } from "react-icons/bs";
const TrainListComponent = ({ trainList, viewMore }) => {
  return (
    <div className="tain-list">
      {trainList.map((el) => {
        return (
          <div className="train">
            <div class="train-name ">
              <div className="train-icon">
                <BsFillTrainFreightFrontFill />
              </div>
              <div>{el.trainName}</div>
            </div>
            <div className="train-route-name">
              <div>
                <b>Source:</b>
                {el.source}
              </div>
              <div>
                <b>Destination:</b>
                {el.destinationList[el.destinationList.length - 1]}
              </div>
            </div>
            <div className="train-button__container">
              <Button variant="outlined" onClick={() => viewMore(el)}>
                view more
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainListComponent;
