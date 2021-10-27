import React, {useState, useEffect, useRef} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';

function Timer(props) {
    const duration = parseInt(props.duration);
    const [timer, setTimer] = useState('00:00:00')
    let currentInterval= useRef(null);

    function startTimer(duration) {
    let start = Date.now(),
        diff,
        hours,
        minutes,
        seconds;

    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        hours = (diff/3600) | 0;
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        setTimer(hours+ ":" + minutes + ":" + seconds );

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    }
    timer();
    currentInterval.current = setInterval(timer, 1000)
}

    useEffect(() => {
        startTimer(duration);
         return () => clearInterval(currentInterval.current);
    },[])

    const resetTimer=() => { 
        clearInterval(currentInterval.current)
        setTimeout(() => {}, 2000)
        setTimer('00:00:00')
    }

  return(

			<div>
				<Grid item xs={6}>
				<Card style={{width: 330, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  margin: '10px', }} >
					<CardContent style={{backgroundColor: '#99badd'}}>
						<Typography variant="overline" display="block" style={{ color: '#FFFFFF', }}>
							{props.name}
						</Typography>
						<Typography component="div" variant="h3" style={{ color: '#FFFFFF', }}>
							{timer}
						</Typography>
						<Button onClick={resetTimer} startIcon={<AlarmOffIcon/>} size="small"  variant='contained' style={{ color: '#99badd', margin: '10px'}}>
							Reset 
						</Button>
						<Button onClick={props.removeTimer} startIcon={<HighlightOffIcon/>} size="small"  variant='contained' style={{ color: 'red'}}>
							Delete
						</Button>
					</CardContent>
				</Card>
				</Grid>
			</div>
    );
}


export default Timer;