import React from 'react'
import { CSVLink } from 'react-csv'
import { Button } from 'reactstrap'

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
        <Button color="primary" className="btn btn-primary btn-sm">
            <CSVLink data={csvData} filename={fileName} style={{color:'white'}}>Download</CSVLink>
        </Button>
    )
}