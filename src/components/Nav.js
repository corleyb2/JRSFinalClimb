import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
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
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

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
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  list: {
    height: "46px",
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
    border: "none",
    backgroundColor: "none",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getUsername = async () => {
      const useAuth = await Auth.currentUserInfo();
      if (useAuth !== null) {
        const gotUser = await useAuth.username;
        setUsername(gotUser);
      }
    };
    getUsername();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
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
                navigate("/climbs");
                handleDrawerClose();
              }}
            >
              Climb Spot List
            </MenuItem>
            <MenuItem
              className={classes.list}
              onClick={() => {
                navigate("/create_climb");
                handleDrawerClose();
              }}
            >
              Add New Climb
            </MenuItem>
          </MenuList>
          <Divider />
          <h3>You are Signed In As:</h3>
          <h3>{username}</h3>
          <h3></h3>
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
                navigate("/");
              }}
            >
              <AmplifySignOut />
            </button>
          </MenuList>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
