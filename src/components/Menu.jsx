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
import { inject, observer } from 'mobx-react'
import { useContext } from 'react' //import hook from react
// const MyContext = React.createContext() 
import { MyContext } from './Topic';
// import url from 'https://fonts.googleapis.com/css2?family=Amatic+SC&family=Crete+Round&display=swap';


const useStyles = makeStyles({
  list: {
    width: 250,
    // background:"linear-gradient(90deg, rgba(130,11,11,1) 10%, rgba(191,46,31,1) 51%, rgba(83,6,6,1) 100%)",
  },
  fullList: {
    width: 'auto',
    // background:"linear-gradient(90deg, rgba(130,11,11,1) 10%, rgba(191,46,31,1) 51%, rgba(83,6,6,1) 100%)"
  },
});



const Menu = inject("userStore")(observer((props) => {
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

  const { logout } = useContext(MyContext) //using hook
  const logOut = () => {

    localStorage.clear()
    props.userStore.logOut()
    logout()
  }



  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      // style={{backgroundColor:"linear-gradient(90deg, rgba(130,11,11,1) 10%, rgba(191,46,31,1) 51%, rgba(83,6,6,1) 100%)"}}
    >
      {/* style={{ background:"linear-gradient(90deg, rgba(130,11,11,1) 10%, rgba(191,46,31,1) 51%, rgba(83,6,6,1) 100%)"}} */}
      <List >
        <Link id="navlinks" style={{textDecoration: "none", color: "white"}} to='/main'>
          <ListItem  button key='sos'>
            <ListItemIcon> <NotificationsActiveIcon /> </ListItemIcon>
            <ListItemText primary='SOS' />
          </ListItem>
        </Link>
        <Link style={{textDecoration: "none", color: "white"}} to='/profile'>
          <ListItem button key='profile'>
            <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>
        <Link style={{textDecoration: "none", color: "white"}} to="/contacts">
          <ListItem button key='Contacts'>
            <ListItemIcon> <ContactPhoneIcon /> </ListItemIcon>
            <ListItemText primary='Contacts' />
          </ListItem>
        </Link>
        <Link style={{textDecoration: "none", color: "white"}} to='/timer'>
          <ListItem button key='Timer'>
            <ListItemIcon> <TimerIcon /> </ListItemIcon>
            <ListItemText primary='Timer' />
          </ListItem>
        </Link>
        <Link style={{textDecoration: "none", color: "white"}} to='/sosMap'>
          <ListItem button key='Map'>
            <ListItemIcon> <AddLocationIcon /> </ListItemIcon>
            <ListItemText primary='Map' />
          </ListItem>
        </Link>
        <Divider />
        <Link style={{textDecoration: "none", color: "white"}} to='/'>
          <ListItem button key='logout' onClick={logOut}>
            <ListItemIcon> < ExitToAppIcon /> </ListItemIcon>
            <ListItemText primary='Log Out' />
          </ListItem>
        </Link>
      </List>


    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor} >
          <MenuIcon onClick={toggleDrawer(anchor, true)} style={{ color: 'white' }} />
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
}))

export default Menu