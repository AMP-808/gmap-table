import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import SimpleAccordion from "./accordion";
import "../App.css";
import SearchIcon from "@material-ui/icons/Search";
import { MyContext } from "../App";

const lightBlue = "#1C85E7";
const darkBlue = "#1C466C";
const grey = "#e2e2e2";

function AiropsTable() {
  const [opsData, setOpsData] = React.useState([]);
  const { panMap } = React.useContext(MyContext);

  //! refactor this to be done on app load
  React.useEffect(() => {
    fetch("/api/passwords")
      .then((response) => response.json())
      .then((json) => setOpsData(json));
  }, []);

  const data = React.useMemo(() => opsData, [opsData]);

  const columns = [
    //{ title: "DSGN Code", field: "dsgn_code", render: null },
    {
      title: "Company Name",
      field: "company_name",
      defaultSort: "asc",
    },
    {
      title: "Address",
      field: "address",
      filtering: false,
      sorting: false,
    },
    {
      title: "City",
      field: "city",
    },
    {
      title: "State",
      field: "state",
      //filterPlaceholder: "Filter State",
    },
    {
      title: "Zip",
      field: "zip",
    },
    {
      title: "Number of Aircraft",
      field: "number_of_aircraft",
      type: "numeric",
      filtering: false,
      searchable: false,
      customSort: (a, b) => a.number_of_planes - b.number_of_planes,
    },
    {
      title: "Years in Business",
      field: "yib",
      type: "numeric",
      filtering: false,
      customSort: (a, b) => {
        var dateA = new Date(a.yib),
          dateB = new Date(b.yib);
        return dateA - dateB;
      },
      render: (rowData) => moment(rowData.yib).toNow(true).toString(),
    },
    {
      title: "FAR Part",
      field: "far_part",
      type: "numeric",
      lookup: {
        91: "Part 91", // Govt Ops - State & Federal",
        121: "Part 121", // Scheduled/Supplemental (Age 65 Limit)",
        125: "Part 125", // Travel Club, Etc.",
        133: "Part 133", // External Load Rotary",
        135: "Part 135", // Charter/Commuter",
        137: "Part 137", // Aerial Application",
      },
      customSort: (a, b) => {
        return a.far_part - b.far_part;
      },
    },
    {
      title: "Link to Apply",
      field: "link_to_apply",
      filtering: false,
      render: (rowData) => (
        <a
          href={rowData.link_to_apply}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply
        </a>
      ),
      sorting: false,
      searchable: false,
    },
  ];

  return (
    <div className="table">
      <MaterialTable
        //style={{ backgroundColor: "#e2e2e2" }}
        title="Air Operators"
        columns={columns}
        data={data}
        icons={{ Filter: () => <SearchIcon style={{ fontSize: "medium" }} /> }}
        actions={[
          {
            icon: "map",
            tooltip: "Show on map",
            onClick: (event, rowData) => panMap(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          search: false,
          headerStyle: {
            backgroundColor: darkBlue,
            color: "#FFF",
          },
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div
                id="mapDiv"
                style={{
                  padding: "10px 10px",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                <SimpleAccordion data={data} />
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}

export default AiropsTable;
