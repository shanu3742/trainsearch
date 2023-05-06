import { Button, Snackbar, TextField } from "@mui/material";
import React from "react";

const AppHeader = ({
  setSearchType,
  searchType,
  open,
  setOpen,
  searchByName,
  setSearchByName,
  getTrain,
  searchByDestination,
  setsearchByDestination,
  getTrainBySource,
}) => {
  return (
    <header className="header">
      <div className="button-container">
        <Button variant="outlined" onClick={() => setSearchType("name")}>
          Search train By Name
        </Button>
        <Button variant="outlined" onClick={() => setSearchType("station")}>
          Search train By stattion
        </Button>
      </div>
      <div className="search-container">
        {searchType === "name" ? (
          <div>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={() => setOpen(false)}
              message="something went wrong"
              key={"vertical" + "horizontal"}
            />
            <TextField
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
              label="Search train"
              variant="standard"
              color="warning"
              focused
            />
            <Button variant="contained" onClick={getTrain}>
              Search
            </Button>
          </div>
        ) : (
          <div className="search-by-source">
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={() => setOpen(false)}
              message="something went wrong"
              key={"vertical" + "horizontal"}
            />
            <TextField
              value={searchByDestination.source}
              onChange={(e) =>
                setsearchByDestination((p) => ({
                  ...p,
                  source: e.target.value,
                }))
              }
              label="Enter Source Name"
              variant="standard"
              color="warning"
              focused
            />
            <TextField
              value={searchByDestination.destination}
              onChange={(e) =>
                setsearchByDestination((p) => ({
                  ...p,
                  destination: e.target.value,
                }))
              }
              label="Enter Destination Name"
              variant="standard"
              color="warning"
              focused
            />
            <Button variant="contained" onClick={getTrainBySource}>
              Search
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
