import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ResourceDrawer({ resources }) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="resource-drawer">
      <IconButton
        className="resource-menu-icon"
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className="resource-drawer-element"
        variant="persistent"
        anchor="right"
        open={open}
      >
        <div className="resource-drawer-header">
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
          <p>Resources</p>
        </div>

        <Divider />
        <div className="resource-drawer-content">
          {resources.map((resource) => (
            <Accordion key={resource.title}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{resource.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div
                    className="markdown"
                    dangerouslySetInnerHTML={{ __html: resource.content }}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
