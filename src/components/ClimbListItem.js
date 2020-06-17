import React, { useState } from "react";

import ClimbPage from "./ClimbPage";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ClimbListItem = ({ climb, planLocation, setPlanLocation }) => {
  const [renderPopover, setRenderPopover] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea className={classes.contentWrapper}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Climb Picture"
          />
          <CardContent className={classes.info}>
            <Typography gutterBottom variant="h5" component="h2">
              {climb.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h3">
              {climb.location.town}, {climb.location.state} {climb.location.zip}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {climb.description}
              {climb._id}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttonWrapper}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setRenderPopover(true);
              handleOpen();
            }}
          >
            Click to See Details
          </Button>
        </CardActions>
      </Card>
      {renderPopover !== false ? (
        <>
          <ClimbPage
            climb={climb}
            handleClose={handleClose}
            open={open}
            planLocation={planLocation}
            setPlanLocation={setPlanLocation}
          />
          <br />
        </>
      ) : (
        <>
          <br />
        </>
      )}
    </>
  );
};

export default ClimbListItem;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  media: {
    height: 140,
    width: 140,
    display: "flex",
    flexDirection: "row",
    border: "3px dotted red",
  },
  info: {
    width: "35vw",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
