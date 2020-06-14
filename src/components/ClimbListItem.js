import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

import ClimbPage from "./ClimbPage";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ClimbListItem = ({ climb, setSelectedClimb, children }) => {
  const classes = useStyles();

  const [renderClimbPage, setRenderClimbPage] = useState(false);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image="../assets
          title="ClimbPhoto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {climb.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {climb.description}
            {climb.location.state}
            {climb.location.zip}
            {climb._id}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            navigate(`/climbs/${climb._id}`);
          }}
        >
          Click to See Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClimbListItem;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
