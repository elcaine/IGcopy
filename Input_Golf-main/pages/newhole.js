import { getSession, getHeaderProps } from "../lib/get-session.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import ResourceDrawer from "./components/ResourceDrawer.js";
import Dashboard from "./components/Dashboard.js";
import { getAllResources, getAllResourcesFromDirectory } from "./api/resources";
import { NetworkCheckOutlined } from "@mui/icons-material";


export default function page({ csrfToken, headerProps, resources, holes }) {
  const startHole = async (holeid) =>
  {
    const response = await fetch('/api/quizzes/begin?csrfToken='+csrfToken+'&topic='+holeid);
    const data = await response.json();
    location.href = '/quiz';
  }
  return (
    <Box sx={{ bgcolor: "#fafafa", height: "100%" }}>
      <div className="container">
        <Header userInfo={headerProps.userInfo} message={headerProps.message} />
        <div className="content-wrapper">
          <Box
            sx={{
              bgcolor: "#fafafa",
              padding: "10px",
              width: "100%",
            }}
          >
            <div id="newhole" style={{margin:'auto',width:'50%','text-align':'center'}}>
              Start a new hole
              {holes.map((hole) =>{
              return (<div key={hole.id}><br /><Button key={hole.id} variant="contained" onClick={()=>{startHole(hole.id)}}>{hole.id + ". " + hole.name}</Button></div>);
            })}
            </div>

          </Box>
          {headerProps.userInfo && (
            <ResourceDrawer resources={resources}></ResourceDrawer>
          )}
        </div>

        <Footer />
      </div>
    </Box>
  );
}

export async function getServerSideProps({ req, res }) {
  var session = await getSession(req, res);
  var headerProps = await getHeaderProps(session);
  const resources = await getAllResources();
  await session.commit();
  const resourceNames = await getAllResourcesFromDirectory();
  function getHoles()
  {
    var holes = [];
    for (var i = 0; i < resourceNames.length; i++)
    {
      // get the hole id from the beginning of md file name
      var id = resourceNames[i].split("_")[0];
      var hole = {};
      hole['id'] = id;
      // get the par from the 2nd part of the md file name
      var par = resourceNames[i].split("_")[1];
      hole['par'] = par
      // get the rest and use it for a name, remove .md at the end
      hole['name'] = resourceNames[i].substring((id + "_" + par + "_").length, resourceNames[i].length-3).replaceAll("_", " ");
      // TODO: temporarily we assume this is zero, later we will need to update it based on the user's progress
      hole['score'] = 0;
      holes.push(hole);
    }
    holes.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
    return holes;
  }
  var holes = getHoles();
  var csrfToken = session.csrfToken;
  return {
    props: { csrfToken, headerProps, resources, holes},
  };
}
