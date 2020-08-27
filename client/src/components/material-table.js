import React, {useState, useEffect} from "react";
import MaterialTable, {MTableToolbar} from "material-table";
import moment from "moment";
import SimpleAccordion from "./accordion";

function MaterialTableThree() {
    const [opsData, setOpsData] = useState([]);

    useEffect(() => {
        fetch("/airops")
            .then((response) => response.json())
            .then((json) => setOpsData(json));
    }, [])

    
    const data = React.useMemo(
        () => opsData, [opsData]
    ) 

    const columns = [
    //{ title: "DSGN Code", field: "dsgn_code", render: null },
        { 
            title: "Company Name",
            field: "company_name", 
            defaultSort: "asc" 
        },
        { 
            title: "Address", 
            field: "address", 
            sorting: false 
        },
        { 
            title: "City", 
            field: "city", 
        },
        {
            title: "State",
            field: "state"
        },
        { 
            title: "Zip", 
            field: "zip", 
            type: "numeric" 
        },
        {
            title: "Number of Planes",
            field: "number_of_planes",
            type: 'numeric',
            searchable: false,
            customSort: (a, b) => a.number_of_planes - b.number_of_planes
        },
        { 
            title: "Years in Business", 
            field: 'yib',
            type: "numeric", 
            customSort: (a, b) => {
                var dateA = new Date(a.yib), dateB = new Date(b.yib);
                return dateA - dateB;
            },
            render: (rowData) => moment(rowData.yib).toNow(true).toString()
        },
        {
            title: "Ops Type",
            field: "ops_type",
            type: "numeric"
        },
        {
            title: "Link to Apply",
            field: "link_to_apply",
            render: (rowData) => <a href={rowData.link_to_apply}>Apply</a>,
            sorting: false,
            searchable: false
        }
    ];

    return (
        <MaterialTable
        title="Airline Operators"
        columns={columns}
        data={data}
        components={{
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div id='mapDiv'style={{padding: '10px 10px', textAlign: 'center', display: 'flex'}}>
              <SimpleAccordion data={data}/>
            </div>
          </div>
        ),
      }}
        // onRowClick={((evt, selectedRow) => selectedRow !== selectedRow.tableData.id ? setSelectedRow(selectedRow.tableData.id): null)}
        // options={{
        //     rowStyle: rowData => ({
        //     backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        //     })
        // }}
        />
    );
}

export default MaterialTableThree