import React from 'react';

const options = ["","Health Care", "Industrials", "Consumer Discretionary", "Information Technology", "Consumer Staples", "Utilities, Health Care", "Financials", "Real Estate", "Materials", "Energy", "Telecommunication Services"]

// this component is the child component of Stocks component
// it controls the search bar, search button and the selection of industry
class SearchTool extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText: '',
            selectedValue: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    // a function to store the value on the searched bar
    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        })
    }

    // an event passes the serached text to the parent component by using props.getRowData()
    handleClick(){
        const text = this.state.searchText
        this.props.getRowData(text, this.state.selectedValue)
    }

    // an event pass the selected industry to the parent component by using props.getRowData()
    handleSelect = e =>{
        const selectedValue = e.target.value;
        this.setState({
            selectedValue: selectedValue
        })
        this.props.getRowData(this.state.searchText, selectedValue)
    }

    render(){
        return(
            <div className="search-tool" style={{display: "flex"}}>
                <div className="select-stock">
                    <h2 className="select-stock-title">Select stock</h2>
                    <div className="search-stock-container">
                        <input className="search-input" type="text" placeholder="serach stock"
                            value={this.state.searchText}
                            onChange={this.handleChange}/>
                        <button className="search-button" onClick={this.handleClick}>Search</button>
                    </div>
                </div>
                <div>
                    <h2 className="select-stock-title">Industry</h2>
                    <select className="select-industry" onChange={this.handleSelect} >
                        {
                            options.map(option => {
                                return(
                                    <option 
                                        value={option} 
                                        checked={this.state.selectedValue == option} 
                                        key={option}>
                                    {option}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        );
    }
}
export default SearchTool;