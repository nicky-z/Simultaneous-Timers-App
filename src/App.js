
import './App.css';
import Box from '@mui/material/Box';
import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import Timer from './Timer';
import { Grid } from '@material-ui/core'

function App() {
  //localStorage.clear()
  const [open, setOpen] = React.useState(false);
  const [hours, setHours] = React.useState('0');
  const [mins, setMins] = React.useState('0');
  const [secs, setSecs] = React.useState('0');
  const [name, setName] = React.useState('');
  const [timerList, setTimerList] = useState(getStorage());

  function getStorage() {
    let timerStorage = localStorage.getItem("timerList");
    if (!timerStorage) return [];
    return JSON.parse(timerStorage.toString());
  }

  useEffect(() => {
    localStorage.setItem("timerList", JSON.stringify(timerList));
  }, [timerList]);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const setTimer = () => {
  setOpen(false);
  let durationInSeconds = (parseInt(hours))*3600 + (parseInt(mins))*60 + (parseInt(secs))
  setTimerList((timerList) => [...timerList, {
    duration: `${durationInSeconds}`,
    id: `${timerList.length}`,
    name: `${name}`
  }]);
}

function removeTimer(timer) {
  setTimerList((timerList) => timerList.filter((t) => t.id !== timer.id));
}

  return (
    <div className="App">
    <div>
    <Grid container justify="flex-end">
    <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddAlarmIcon/>}>
      Add Timer
    </Button>
    </Grid>
    <Dialog open={open} onClose={handleClose} fullWidth
  maxWidth="xs">
    <DialogTitle><AccessAlarmIcon/> Set timer</DialogTitle>
      <DialogContent>
      <TextField
            autoFocus
            id="name"
            label="Name"
            defaultValue=""
            size="small"
            margin="normal"
            onChange={(evt) => { setName(evt.target.value) }}
          />
      <Box
            noValidatex
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              // m: 'auto',
              // width: 'fit-content',
              '& .MuiTextField-root': { m: 'auto', width: '10ch' },
            }}
          >
      <TextField
            autoFocus
            margin="dense"
            id="hour"
            label="Hours"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 24 } }}
            variant="standard"
            onChange={(evt) => { setHours(evt.target.value) }}
          />
          :
          <TextField
            autoFocus
            margin="dense"
            id="minute"
            label="Minutes"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 60 } }}
            variant="standard"
            onChange={(evt) => { setMins(evt.target.value) }}
          />
          :
          <TextField
            autoFocus
            margin="dense"
            id="second"
            label="Seconds"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 60 } }}
            variant="standard"
            onChange={(evt) => { setSecs(evt.target.value) }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={setTimer}>Set</Button>
      </DialogActions>
    </Dialog>
  </div>

  {timerList.length ? 
    (

      <Grid container style={{ gap: 20 }}  >
        {timerList.map((timer) => {
          return (
            <Timer
                key = {timer.id}
                id = {timer.id}
                name = {timer.name}
                duration = {timer.duration}
                removeTimer={() => removeTimer(timer)}
              />
          );
      })}
      </Grid>
      

    ) : (
      <p>Add a Timer</p>
  )}

</div>
);

// {timerList.map((timer)=> {
//   return(
//     <div>
//       <span>id: {timer.id} seconds: {timer.duration}</span>
//   <Timer
//     key = {timer.id}
//     id = {timer.id}
//     duration = {timer.duration}
//   />
//   </div>
//   )
// })}

  // {timerList.length ? 
  //   (
  //     <Grid container className={classes.root}>
  //       {timerList.map((timer) => {
  //         return (
  //        <Timers timer={timer} />
  //         );
  //     })}
  //     </Grid>
  //   ) : (
  //     <p>Add a Timer</p>
  // )}

}

export default App;
