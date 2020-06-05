import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { navigate } from "@reach/router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    marginLeft: "35px",
  },
  titleDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  avatarContainer: {
    width: "185px",
    height: "185px",
    borderRadius: "50%",
    border: "2px solid black",
    margin: "auto",
  },
  avatar: {
    width: "185px",
    height: "185px",
    borderRadius: "50%",
    margin: "auto",
    background: "white",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  signOut: {
    maxWidth: "100%",
    justifyContent: "center",
  },
}));

export default function Nav({ boundLogOut }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Climb App
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <MenuList>
          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/");
              handleDrawerClose();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/user");
              handleDrawerClose();
            }}
          >
            My Profile
          </MenuItem>

          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("create_user");
              handleDrawerClose();
            }}
          >
            Create A Profile
          </MenuItem>
          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/edit_user");
              handleDrawerClose();
            }}
          >
            Edit Profile
          </MenuItem>
          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/climbs");
              handleDrawerClose();
            }}
          >
            Search Climbs
          </MenuItem>
          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/user");
              handleDrawerClose();
            }}
          >
            Add New Climb
          </MenuItem>

          <MenuItem
            className={classes.list}
            onClick={() => {
              navigate("/plan_trip");
              handleDrawerClose();
            }}
          >
            Plan a Trip
          </MenuItem>
        </MenuList>
        <Divider />
        <div className={classes.avatarContainer}>
          {/* <img
            src={require("../assets/JRSLogo.jpg")}
            className={classes.avatar}
          /> */}
        </div>
        <MenuList
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <button
            className={classes.signOut}
            onClick={() => {
              boundLogOut();
              navigate("/");
              handleDrawerClose();
            }}
          ></button>
        </MenuList>
      </Drawer>
    </div>
  );
}
