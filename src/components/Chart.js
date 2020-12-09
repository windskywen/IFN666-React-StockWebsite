import React from 'react';
import { Line } from 'react-chartjs-2';

// this is the component that controls the chart 
class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: {
                labels: [],
                dataSets: [],
            },
            lineOptions:{
                responsive: true,
                title: {
                    display: true,
                    text: "Closing Price",
                    fontSize: 20,
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Date",
                        },
                        ticks: {
                            reverse:true,
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Price",
                        },
                    }],
                  },
                  legend: {
                    display: false,
                  },
                  tooltips: {
                    enabled: false,
                  },
            }
        }
    }

    async componentDidMount(){
        let closePrice = [] 
        let date = []
        await this.props.filteredData.map(p => {
            closePrice.push(p.close)
            date.push(p.timestamp)
        })
        this.setState({
            isLoading: false, 
            data: {
                labels: date, 
                datasets: [
                    {   
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: closePrice
                    }
                ]   
            },
        })
    }

    // when the props is udpate, the new props is delivered again and change the state data
    componentDidUpdate(prevProps, prevState){
        if(prevProps.filteredData !== this.props.filteredData){
            let closePrice = [] 
            let date = []
            this.props.filteredData.map(p => {
                closePrice.push(p.close)
                date.push(p.timestamp)
            })
            this.setState({
                isLoading: false, 
                data: {
                    labels: date, 
                    datasets: [
                        {   
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: closePrice
                        }
                    ]   
                },
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.isLoading ? (
                    <div>Loading...</div>
                ):(
                    <div className="chart" style={{width:800, height:500}}>
                        <Line 
                            options = {this.state.lineOptions}
                            data = {this.state.data}
                        />
                    </div>
                )}
            </div>
        )
    }
}
export default Chart;
