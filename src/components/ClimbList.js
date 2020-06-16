import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import ClimbListItem from "./ClimbListItem";

//details for each climbing location
//accessible from click of list

export const ClimbList = () => {
  const [climbs, setClimbs] = useState([]);
  const [selectedClimb, setSelectedClimb] = useState("");

  useEffect(() => {
    async function getAllClimbs() {
      const request = await axios({
        method: "GET",
        url: "http://localhost:4000/climbs",
        header: {
          "Content-Type": "application/json",
        },
      });
      setClimbs(request.data);
    }
    getAllClimbs();
  }, []);

  const classes = useStyles();

  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <h2>Climb List Page</h2>
        <p>Input here to search (by zip?)</p>
        <div className={classes.root}>
          {climbs.map((climb) => (
            <div key={climb._id}>
              <ClimbListItem
                climb={climb}
                setSelectedClimb={setSelectedClimb}
                selectedClimb={selectedClimb}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClimbList;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },
});
