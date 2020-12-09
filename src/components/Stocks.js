import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'css/stocks.css';
import SearchTool from 'components/SearchTool.js';

class Stocks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columnDefs: [
                { headerName: 'Stock', field: 'symbol', width: 100},
                { headerName: 'Name', field: 'name', width: 300 },
                { headerName: 'Industry', field: 'industry', width: 300 }
            ],
            rowSelection: "single",
            onSelectionChanged: this.onSelectionChanged,
            sourceData: null,
            rowData: null,
            searchText: '',
            searchIndustry: ''
        }

        this.getRowData = this.getRowData.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    // fetch the API to get the stock data and store in the state
    componentDidMount(){
        fetch('http://131.181.190.87:3001/all')
        .then(res => res.json())
        .then(getData => this.setState({
            sourceData: getData,
            rowData: getData,
        }))
        .catch(err => console.log(err));
    }

    // use the searched text and the selected industry to filter the original data
    // save the searched text, selected industry value and rowData into the state
    getRowData(text, selectedValue){
        let data = [...this.state.sourceData]
        if(text != '' && selectedValue == ''){ 
            data = this.textFilter(data, text)
        }else if(text == '' && selectedValue != ''){
            data = this.industryFilter(data, selectedValue)
        }else if(text != '' && selectedValue != ''){
            data = this.textFilter(data, text)
            data = this.industryFilter(data, selectedValue)
        }
        this.setState({rowData: data})
        this.setState({searchText: text})
        this.setState({searchIndustry: selectedValue})
    }

    // a function to filter the searched text
    textFilter(array, text){
        return (array.filter(p => {
            const matchArray = p.symbol.match(new RegExp(text, 'gi'))
            return matchArray !== null
        }))
    }

    // a function to filter the selected industry
    industryFilter(array, selectedValue){
        return (array.filter(p=>p.industry == selectedValue))
    }

    // AgGrid attribute
    onGridReady = params => {
        this.gridApi = params.api;
    }

    // when a specific stock on the table is clicked, this function redirect the page of the stock Info page
    onSelectionChanged = () => {
        let selectedRow = this.gridApi.getSelectedRows();
        this.props.history.push({
            pathname: '/history',
            search: `?symbol=${selectedRow[0].symbol}`
        })
    }

    render(){
        return (
            <div className="stocks">
                <div className="search-container">
                    <SearchTool getRowData={this.getRowData} />
                </div>
                <div className="data-container">
                    <div className="ag-theme-balham" style={{height: '500px', width: '600px'}}>
                        <AgGridReact 
                            columnDefs = {this.state.columnDefs}
                            rowData = {this.state.rowData}
                            pagination = {true}
                            onGridReady={this.onGridReady}
                            onSelectionChanged={this.onSelectionChanged}
                            rowSelection={this.state.rowSelection}
                        >
                        </AgGridReact>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stocks; 

