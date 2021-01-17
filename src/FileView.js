import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "./actions/fileActions";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class FileView extends Component {
  colDefs = [
    { field: "id", checkboxSelection: true, filter: "agNumberColumnFilter" },
    { field: "file", filter: "agTextColumnFilter" },
    { field: "value", filter: "agNumberColumnFilter" },
    { field: "time", filter: "agNumberColumnFilter" },
    { field: "rate", filter: "agNumberColumnFilter" },
    { field: "monthly", filter: "agNumberColumnFilter" },
    { field: "interest", filter: "agNumberColumnFilter" },
  ];
  defaultColDef = { sortable: true };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  addValue = () => {
    this.props.actions.addValue();
  };

  randomValue = () => {
    this.props.actions.randomValue();
  };

  newFile = () => {
    this.props.actions.newFile();
  };

  deleteFiles = () => {
    let ids = [];
    this.gridApi.forEachNode(node => {
      if (node.isSelected()) {
        ids.push(node.data.id);
      }
    });
    this.props.actions.deleteFiles(ids);
  };

  calculateInterest = () => {
      this.props.actions.calculateInterest();
  }

  render() {
    return (
      <div id="myGrid" style={{ height: 450 }} className="ag-theme-balham">
        <button onClick={() => this.addValue()}>Add 1 Value to Even Ids</button>
        <button onClick={() => this.randomValue()}>Randomize Values</button>
        <button onClick={() => this.newFile()}>Add File</button>
        <button onClick={() => this.deleteFiles()}>Delete Files</button>
        <button onClick={() => this.calculateInterest()}>Calculate Interest</button>
        <AgGridReact
          rowData={this.props.files}
          deltaRowMode={true}
          getRowNodeId={data => data.id}
          columnDefs={this.colDefs}
          onGridReady={this.onGridReady}
          defaultColDef={this.defaultColDef}
          rowSelection={"multiple"}
          onFirstDataRendered={params => params.api.sizeColumnsToFit()}
        ></AgGridReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({ files: state.files });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FileView);