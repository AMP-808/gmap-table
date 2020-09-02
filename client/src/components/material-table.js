import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
/* import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/Textfield"; */
import moment from "moment";
import SimpleAccordion from "./accordion";
import "../App.css";

function AiropsTable() {
  const [opsData, setOpsData] = useState([]);

  useEffect(() => {
    fetch("/api/passwords")
      .then((response) => response.json())
      .then((json) => setOpsData(json));
  }, []);

  const data = React.useMemo(() => opsData, [opsData]);

  /* const CustomFilter = (props) => {
    const [selectedVal, setSelectedVal] = useState(0);

    function handleChange(e) {
      const val = e.target.value;
      setSelectedVal(val);
      props.onFilterChanged(props.columnDef.id, val);
    }

    return (
      <Autocomplete
        id="combo-box-demo"
        options={props.company_name}
        onChange={handleChange}
        getOptionLabel={(option) => option.title}
        style={{ width: 170 }}
        renderInput={(params) => (
          <TextField {...params} label="Company Name" variant="outlined" />
        )}
      />
    );
  }; */

  const columns = [
    //{ title: "DSGN Code", field: "dsgn_code", render: null },
    {
      title: "Company Name",
      field: "company_name",
      defaultSort: "asc",
      //filterComponent: (props) => <CustomFilter {...props} />,
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
      type: "numeric",
    },
    {
      title: "Number of Planes",
      field: "number_of_planes",
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
        <a href={rowData.link_to_apply} target="_blank">
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
        title="Airline Operators"
        columns={columns}
        data={data}
        options={{ filtering: true }}
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
          //   FilterRow: (props) => (
          //     <Autocomplete
          //       id="combo-box-demo"
          //       options={data.props}
          //       getOptionLabel={(option) => option.title}
          //       style={{ width: 200, padding: 10 }}
          //       renderInput={(params) => (
          //         <TextField {...params} label="Combo box" variant="outlined" />
          //       )}
          //     />
          //   ),
        }}
        // onRowClick={((evt, selectedRow) => selectedRow !== selectedRow.tableData.id ? setSelectedRow(selectedRow.tableData.id): null)}
        // options={{
        //     rowStyle: rowData => ({
        //     backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        //     })
        // }}
      />
    </div>
  );
}

export default AiropsTable;
