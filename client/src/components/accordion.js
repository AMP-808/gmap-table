import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./map";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    flexGrow: 0,
  },
}));

export default function SimpleAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          onClick={toggleExpanded}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {!expanded ? "Click to open Map" : "Click to close Map"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Map data={props.data} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
