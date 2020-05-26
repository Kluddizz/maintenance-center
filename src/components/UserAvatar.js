import React from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  user: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "none",
    background: "transparent",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    height: "64px",

    "&:hover": {
      background: "transparent"
    }
  },

  username: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const UserAvatar = ({ firstName = "", lastName = "", onLogout, ...props }) => {
  const classes = useStyles();

  return (
    <PopupState variant="popover">
      {popupState => {
        const handleLogout = () => {
          onLogout();
          popupState.close();
        };

        return (
          <>
            <Button className={classes.user} {...bindTrigger(popupState)}>
              <Avatar>
                {firstName.charAt(0).toUpperCase() +
                  lastName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography
                className={classes.username}
              >{`${firstName} ${lastName}`}</Typography>
              <ExpandMoreIcon />
            </Button>

            <Menu {...bindMenu(popupState)}>
              {onLogout ? (
                <MenuItem onClick={handleLogout}>Ausloggen</MenuItem>
              ) : null}
            </Menu>
          </>
        );
      }}
    </PopupState>
  );
};

export default UserAvatar;
