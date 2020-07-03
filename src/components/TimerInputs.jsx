import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GreenButton from './GreenButton';
import CountDown from './CountDown';
import Topic from './Topic'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TimerInputs = inject("userStore")(observer((props) => {
  const classes = useStyles();
  const [hours, setHours] = useState('');
  const [open, setOpen] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const stopTimerClick = () => {
    props.userStore.stopTimer()
  }

  const handleChange = (event) => {
    setHours(+event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const startCount = () => {
    setIsStart(true)
    props.userStore.greenSignal(hours)
  }

  const hoursArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  return (
    <div>
      <Topic/>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Hour</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={hours}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hoursArray.map(h =>
            <MenuItem key={h} value={h}>{h}</MenuItem>
          )}
        </Select>
      </FormControl>
      <GreenButton startCount={startCount} />
      {props.userStore.timer.isOn ? <CountDown time={props.userStore.timer} /> : null}
      <button onClick={stopTimerClick}>STOP TIMER</button>
    </div>
  )
}))
export default TimerInputs

