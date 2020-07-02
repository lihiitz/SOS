import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import TimerIcon from '@material-ui/icons/Timer';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Menu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <Link to='/main'>
          <ListItem button key='sos'>
            <ListItemIcon> <NotificationsActiveIcon /> </ListItemIcon>
            <ListItemText primary='SOS' />
          </ListItem>
        </Link>
        <Link to='/profile'>
          <ListItem button key='profile'>
            <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>
        <Link to="/contacts">
          <ListItem button key='Contacts'>
            <ListItemIcon> <ContactPhoneIcon /> </ListItemIcon>
            <ListItemText primary='Contacts' />
          </ListItem>
        </Link>
        <Link to='/timer'>
          <ListItem button key='Timer'>
            <ListItemIcon> <TimerIcon /> </ListItemIcon>
            <ListItemText primary='Timer' />
          </ListItem>
        </Link>
        <ListItem button key='Timer'>
          <ListItemIcon> <AddLocationIcon /> </ListItemIcon>
          <ListItemText primary='Map' />
        </ListItem>
        <Divider />
        <ListItem button key='logout'>
          <ListItemIcon> < ExitToAppIcon /> </ListItemIcon>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>


    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon style={{color:'white'}}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Menu