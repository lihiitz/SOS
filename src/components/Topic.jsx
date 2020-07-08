import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from './Menu'
export const MyContext = React.createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Topic() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ background:"linear-gradient(90deg, rgba(130,11,11,1) 10%, rgba(191,46,31,1) 51%, rgba(83,6,6,1) 100%)"}} position="static">
        <Toolbar>
          <IconButton  color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SOS
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}