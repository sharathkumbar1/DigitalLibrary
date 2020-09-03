/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { object, string, func } from "prop-types";
import { Link } from "react-router-dom";
//import logoIcon from "../../images/IDP_Logo-white-small.png";
import logoIcon from '../../images/Samarthanam_New.png'
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <Toolbar className="header">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => props.handleDrawerOpen()}
        edge="start"
        className={clsx(classes.menuButton, props.openSideNav && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Link className="pure-menu-heading" to="/">
        <img src={logoIcon} alt="logo" height="60"/>
      </Link>
    </Toolbar>
  );
};

Header.displayName = "Header";

Header.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
};

Header.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Header);
