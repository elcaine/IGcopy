import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "next/link";
import {Snackbar, Alert} from "@mui/material";
import { SettingsPowerRounded } from "@mui/icons-material";
import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"
import TableRow from "@mui/material/TableRow"

function userName(userInfo) {
	console.log('username', userInfo)
  return userInfo ? userInfo.username : "";
}

function continueButton(gameInProgress)
{
  return (gameInProgress != "") ? (<Button variant="contained" href="/quiz">Continue hole {gameInProgress}</Button>) : "";
}

export default function Dashboard({holes, userInfo, gameInProgress}) {
  const [open, setOpen] = React.useState(false);
  function warningClose(confirmed)
  {
    setOpen(false);
    if (confirmed)
    {
      location.href = '/newhole';
    }
  }
  function warningOpen()
  {
    if (gameInProgress != "")
    {
      setOpen(true);
    }
    else
    {
      location.href = 'newhole';
    }
  }

  return (
    <div className="dashboard">
      <div id="welcome-message" style={{margin:'auto',width:'50%','text-align':'center'}}>
        Welcome, {userInfo.username}!
        <br />
        <br />
        <Button variant="contained" onClick={warningOpen}>New Hole</Button>
        <br />
        <br />
        {continueButton(gameInProgress)}
        <br />
        <br />
        Progress
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Hole</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Par</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {holes.map((row)=>
              { return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id + ". " + row.name}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                  <TableCell align="right">{row.par}</TableCell>
                </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={()=>warningClose(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

          <DialogTitle id="alert-dialog-title">
            {"Begin a new hole?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {"Starting a new hole will remove your progress for the hole that you already started. Do you still want to begin a new hole?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>warningClose(false)}>Cancel</Button>
            <Button onClick={()=>warningClose(true)}>Yes</Button>
          </DialogActions>
      </Dialog>


    </div>
  );
}

