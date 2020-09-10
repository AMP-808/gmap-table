import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Map from "./map";
import { AppMapContext } from "../contexts/MapContext";

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

function SimpleAccordion(props) {
  const classes = useStyles();
  const { expanded, toggleExpanded, itemLatLng } = React.useContext(AppMapContext);
  //const mapRef = React.useRef(null);
  //const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const handleClick = () => {
    toggleExpanded();
    //scrollToRef();
  };

  return (
    <div className={classes.root}>
      {" "}
      {/*ref={mapRef}> */}
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

export default SimpleAccordion;
