import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import dateFormat from 'dateformat';
import Chart from 'components/Chart.js';
import 'css/stockInfo.css';

// This component control the stock info page 
class StockInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isSearch: false,
            columnDefs: [
                { headerName: 'Date', field: 'timestamp', width: 140},
                { headerName: 'Open', field: 'open', width: 80 },
                { headerName: 'High', field: 'high', width: 80 },
                { headerName: 'Low', field: 'low', width: 80},
                { headerName: 'Close', field: 'close', width: 80 },
                { headerName: 'Volumes', field: 'volumes', width: 140 }
            ],
            sourceData: [],
            filteredData: [],
            selectedData: [],
            selectedOption: "------",
            selectedDate: "",
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    // fetch API to get a specific stock information and store it into the state
    async componentDidMount(){
        var location = this.props.location.search
        var url = 'http://131.181.190.87:3001/history' + `${location}`
        var response = await fetch(url);
        var data = await response.json();
        this.setState({
            sourceData: data,
            filteredData: this.stockInfoFilter(data),
            isLoading: false,
        })
    }

    // choose the data type and change the data form that can be displayed on the table and chart
    stockInfoFilter(array){
        let data = [];
        array.map(p=>{
            data.push({
                "timestamp": dateFormat(p.timestamp,'yyyy-mm-dd'),
                "open": p.open,
                "high": p.high,
                "low": p.low,
                "close": p.close,
                "volumes": p.volumes,
            })
        })
        return data;
    }

    // an event function to get the selected date 
    handleSelect = e =>{
        const selectedDate = e.target.value;
        this.setState({selectedDate: selectedDate});
    }

    // function to filter the data by seleced date
    handleClick(){
        let selectedData = [...this.state.filteredData]
        selectedData = selectedData.filter(p => this.state.selectedDate <= p.timestamp)
        this.setState({selectedData: selectedData, isSearch: true})
    }

    render(){
        return(
            <div className="stockInfo-container">
                {this.state.isLoading ? (
                    <div>Loading...</div>
                    ) : (
                        <div className="stockInfo-container">
                            <div className="stockInfo-search">
                                <span>Search date from </span>
                                <select onChange={this.handleSelect}>
                                    <option>------</option>
                                    {this.state.filteredData.map(p=>{
                                        return(
                                            <option
                                                value={p.timestamp} 
                                                checked={this.state.selectedOption == p.timestamp} 
                                                key={p.timestamp}
                                            >{p.timestamp}</option>
                                        )
                                    })}
                                </select>
                                <button onClick={this.handleClick}>search</button>
                            </div>
                            <div className="stockInfo-data">
                                <span>Showing stock information for the <b>{this.state.sourceData[0].name}</b></span>
                                <div className="ag-theme-balham" style={{height: '300px', width: '600px'}}>
                                    <AgGridReact 
                                        columnDefs = {this.state.columnDefs}
                                        rowData = {this.state.isSearch ? this.state.selectedData : this.state.filteredData}
                                        pagination = {true}
                                    >
                                    </AgGridReact>
                                </div>
                                <Chart filteredData={this.state.isSearch ? this.state.selectedData : this.state.filteredData}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
export default StockInfo;


