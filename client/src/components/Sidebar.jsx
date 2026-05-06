import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from 'react-router-dom'
import { Route, Switch, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom'
import Student from '../pages/Students'
import Profile from '../pages/Profile'
import Counter from "./Counter";
import Result from "../pages/Result";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const drawerWidth = 240;
function ResponsiveDrawer(props) {
  const history = useHistory()
  const { path, url } = useRouteMatch()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    history.push("/")
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ fontWeight: "900" }} className="bg-primary text-white fs-5">WebSkillHub</Toolbar>
      <Divider />
      {
        currentUser.roll === "admin" ?
          <List sx={{ flexGrow: 1 }}>
            {["Dashboard", "Student", "Result", "Profile"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Link
                    to={text === 'Dashboard' ? `${url}` : `${url}/${text.toLowerCase()}`}
                    className="flex items-center gap-2 w-full text-decoration-none text-dark w-100"
                  >
                    {text}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          :
          <List sx={{ flexGrow: 1 }}>
            {["Result","Profile"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Link
                    to={text === 'Dashboard' ? `${url}` : `${url}/${text.toLowerCase()}`}
                    className="flex items-center gap-2 w-full text-decoration-none text-dark w-100"
                  >
                    {text}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
      }

      {/* <Divider /> */}
      <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {/* 1. User Email Card */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: "12px",
            bgcolor: "#1c2237", // Darker card background from ref
          }}

        >
          <div
            style={{
              width: "35px",
              height: "35px",
              backgroundColor: "#5552E9",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {currentUser.email.at(0).toUpperCase()}
          </div>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="body2"
              sx={{ color: "white", noWrap: true, fontSize: "0.85rem" }}
            >
              <strong>{currentUser.email}</strong>
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#8a92a6", display: "block" }}
            >
              <span className="text-muted">{currentUser.roll.toUpperCase()}</span>
            </Typography>
          </Box>
        </Box>

        {/* 2. Logout Button */}
        <ListItemButton
          sx={{
            borderRadius: "10px",
            color: "#ff5b5b", // Reddish color from ref
            "&:hover": { bgcolor: "rgba(255, 91, 91, 0.1)" },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: "35px" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          boxShadow: "none"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            WebSkillHub
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar></Toolbar>
        <Switch>
          <Route exact path={`${path}`}>
            <Counter />
          </Route>
          <Route path={`${path}/student`}>
            <Student currentUser={currentUser} />
          </Route>
          <Route path={`${path}/profile`}>
            <Profile currentUser={currentUser} />
          </Route>
          <Route path={`${path}/result`}>
            <Result currentUser={currentUser} />
          </Route>
        </Switch>

      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
