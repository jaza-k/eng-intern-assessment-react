/**
 * @author Jaza Khan <jaza-k@protonmail.com>
 */

import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import stopwatchStyles from "../styles/stopwatchStyles";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // hook for managing stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // set an interval when stopwatch is running
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running && interval !== null) {
      // clear interval when stopwatch stops
      clearInterval(interval);
    }

    // cleanup function on component unmount
    return () => interval && clearInterval(interval);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };

  // utility function to format time in mm:ss.SSS format
  const formatTime = (time: number) => {
    let milliseconds = time % 1000;
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / 60000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <Box>
      <Typography variant="h4" sx={stopwatchStyles.heading}>Stopwatch ⏱️</Typography>
      <Paper sx={stopwatchStyles.stopwatchPaper}>
        <Box sx={stopwatchStyles.timeDisplay}>{formatTime(time)}</Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" onClick={handleStartStop}>{running ? "Stop" : "Start"}</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleReset}>Reset</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleLap} disabled={!running}>Lap</Button>
          </Grid>
        </Grid>
        
        <Box sx={stopwatchStyles.lapList}>
          <List>
            {laps.map((lapTime, index) => (
              <ListItem key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Stopwatch;
