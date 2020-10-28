import React, { useContext } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import "./App.css";

import { StateProvider } from "./contexts/StateContext";
import { SystemProvider } from "./contexts/SystemContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { MaintenanceProvider } from "./contexts/MaintenanceContext";
import { UserProvider } from "./contexts/UserContext";
import AppContext from "./contexts/AppContext";
import AuthContext from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Maintenances from "./pages/Maintenances";
import Customers from "./pages/Customers";
import Systems from "./pages/Systems";
import UserAvatar from "./components/UserAvatar";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BuildIcon from "@material-ui/icons/Build";
import GroupIcon from "@material-ui/icons/Group";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
    background: "#414B61",
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: "#fff",
      color: theme.palette.text.primary,
    },
  },

  appToolbar: {
    paddingRight: 0,
  },

  toolbar: theme.mixins.toolbar,

  title: {
    color: theme.palette.primary.contrastText,
    lineHeight: `64px`,
    padding: "0 16px",
  },

  pageTitle: {
    marginRight: "auto",
  },

  navOverline: {
    color: theme.palette.primary.contrastText,
    opacity: 0.6,
  },

  navItemText: {
    color: theme.palette.primary.contrastText,
  },

  navItemIcon: {
    color: theme.palette.primary.contrastText,
  },

  content: {
    marginTop: 64,
    width: `calc(100vw - ${drawerWidth}px)`,
    padding: theme.spacing(3),
  },
}));

const navItemsGeneral = [
  {
    header: "Dashboard",
    icon: <DashboardIcon />,
    target: "/app/dashboard",
  },
];

const navItemsManagement = [
  {
    header: "Wartungen",
    icon: <BuildIcon />,
    target: "/app/maintenances",
  },
  {
    header: "Anlagen",
    icon: <LocationCityIcon />,
    target: "/app/systems",
  },
  {
    header: "Kunden",
    icon: <GroupIcon />,
    target: "/app/customers",
  },
];

function App() {
  const classes = useStyles();
  const [title] = useContext(AppContext);
  const history = useHistory();

  const {
    token: [, , removeToken],
    user: [user],
  } = useContext(AuthContext);

  const handleLogout = () => {
    removeToken();
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Wartungscenter
        </Typography>
        <List>
          {navItemsGeneral.map((navItem) => {
            const handleClick = () => {
              history.push(navItem.target);
            };

            return (
              <ListItem button onClick={handleClick} key={navItem.header}>
                <ListItemIcon className={classes.navItemIcon}>
                  {navItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={navItem.header}
                  className={classes.navItemText}
                />
              </ListItem>
            );
          })}
        </List>

        <List>
          <ListItem>
            <Typography className={classes.navOverline} variant="overline">
              Verwaltung
            </Typography>
          </ListItem>
          {navItemsManagement.map((navItem) => {
            const handleClick = () => {
              history.push(navItem.target);
            };

            return (
              <ListItem button onClick={handleClick} key={navItem.header}>
                <ListItemIcon className={classes.navItemIcon}>
                  {navItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={navItem.header}
                  className={classes.navItemText}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appToolbar}>
          <Typography className={classes.pageTitle} variant="h6" noWrap>
            {title}
          </Typography>
          <UserAvatar
            firstName={user?.firstname}
            lastName={user?.lastname}
            onLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer variant="temporary">{drawer}</Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Switch>
          <UserProvider>
            <CustomerProvider>
              <SystemProvider>
                <MaintenanceProvider>
                  <StateProvider>
                    <Route path="/app/dashboard" component={Dashboard} />
                    <Route path="/app/maintenances" component={Maintenances} />
                    <Route path="/app/customers" component={Customers} />
                    <Route path="/app/systems" component={Systems} />
                  </StateProvider>
                </MaintenanceProvider>
              </SystemProvider>
            </CustomerProvider>
          </UserProvider>
        </Switch>
      </main>
    </div>
  );
}

export default App;
