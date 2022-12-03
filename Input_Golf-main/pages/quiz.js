import { getSession, getHeaderProps } from "../lib/get-session.js";
import Header from "./components/Header.js";
import MCQuiz from "./components/MCQuiz.js";
import Footer from "./components/Footer.js";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import {Stack, Snackbar, Alert} from "@mui/material";
import ResourceDrawer from "./components/ResourceDrawer.js";
import Box from "@mui/material/Box";
import { getProgress } from "./api/user/progress.js";
import React, {useState} from 'react';
import { getAllResources, getAllResourcesFromDirectory} from "./api/resources";
import { SensorDoorTwoTone } from "@mui/icons-material";
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import Paper from "@mui/material/Paper"
import TableRow from "@mui/material/TableRow"



export default function page({ csrfToken, message, headerProps, quizQuestions, resources, firstId, par, attempts }) {

  const [currentId, setCurrentId] = useState(firstId);
  const [wrongOpen, setWrongOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [tempQuizQuestions, setTempQuizQuestions] = useState(quizQuestions);
  const [tempAttempts, setAttempts] = useState(attempts);
  const [done, setDone] = useState(false);
  const handleWrongClose = ()=>
  {
    setWrongOpen(false);
  }
  const handleRightClose = ()=>
  {
    setRightOpen(false);
  }
  const solve = async (answerIndex)=>
  {
    const response = await fetch('/api/quizzes/solve?csrfToken=' + csrfToken + '&qId=' + currentId + '&answerIndex=' + answerIndex);
    var data = await response.json();
    setAttempts(tempAttempts+1);
    if (data.solved == true)
    {
      for (var i = 0; i < tempQuizQuestions.length; i++)
      {
        if (tempQuizQuestions[i].id == currentId)
        {
          tempQuizQuestions.splice(i, 1);
          setTempQuizQuestions(tempQuizQuestions);
          setRightOpen(true);
          if (i < tempQuizQuestions.length)
          {
            setCurrentId(tempQuizQuestions[i].id);
            
          }
          else
          {
            setDone(true);
            location.href = '/';
          }
        }

      }
    }
    else
    {
      console.log('wrong answer provided');
      setWrongOpen(true);
    }

  }
  
  return (
    <div style={{height: "100%" }}>
    <Box sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
      
        <Header userInfo={headerProps.userInfo} message={message} />
        <div className="content-wrapper">
        
        <Box sx={{
              bgcolor: "#fafafa",
              padding: "10px",
              width: "100%",
            }}>
              
              
            
          {
          (!done) ?   (
          <div style={{width:"50%", margin: "auto"}}>
          <div style={{"text-align":"center", padding:"10px"}}>

          {tempQuizQuestions[0].question}
          </div>
          <Stack>
          {tempQuizQuestions[0].answers.map((ans, index)=><Button style={{marginBottom:"5px"}} variant="contained" key={index} onClick={()=>{solve(index)}}>{ans}</Button>)}
          </Stack>
          <br />
          <br />
          <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell >Score</TableCell>
                    <TableCell >Par</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                
                    <TableRow>
                      <TableCell >{tempAttempts}</TableCell>
                      <TableCell >{par}</TableCell>
                    </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          )
          : ""
        }

        <Button style={{position:"absolute", bottom: "10px"}} variant="contained" href="/">Return to Dashboard</Button>
        </Box>
        
        {headerProps.userInfo && (
            <ResourceDrawer resources={resources}></ResourceDrawer>
          )}
        </div>
        <Footer />
      
    </Box>
    <Snackbar open={wrongOpen} onClose={handleWrongClose} autoHideDuration={1500}><Alert severity="error" onClose={handleWrongClose}>{"Wrong answer :(. Try again."}</Alert></Snackbar>

    <Snackbar open={rightOpen} onClose={handleRightClose} autoHideDuration={1500}><Alert severity="success" onClose={handleRightClose}>{"Nice job! You got the right answer!"}</Alert></Snackbar>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
    var session = await getSession(req, res);
    var csrfToken = session.csrfToken;
    var headerProps = await getHeaderProps(session);
    var progress = await getProgress(req, res);
    var quizQuestions = progress.solvedArray;
    var message = session.message;
    const resources = await getAllResources();
    var firstId = quizQuestions[0].id;
    var par = 0;
    const resourceNames = await getAllResourcesFromDirectory();
    for (var i = 0; i < resourceNames.length; i++)
    {
      if (resourceNames[i].split("_")[0] == progress.gameInProgress)
      {
        par = resourceNames[i].split("_")[1];
      }
    }
    var attempts = progress.attempts;

    for (var i = 0; i < quizQuestions.length; i++)
    {
      if (quizQuestions[i].solved == true)
      {
        quizQuestions.splice(i, 1);
      }
    }

    return {
      props: {csrfToken, message, headerProps, quizQuestions, resources, firstId, par, attempts}
    };
  }