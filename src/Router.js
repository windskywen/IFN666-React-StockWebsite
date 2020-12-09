import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from 'components/Home';
import Stocks from 'components/Stocks';
import StockInfo from 'components/StockInfo';
import 'css/headerStyle.css';

class Router extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <ul className="header">
                        <li className="page-title"><Link to="/" 
                            style={{fontSize: 20, color: "black", textDecoration: 'none'}}>Home</Link></li>
                        <li className="page-title" style={{fontSize: 22}}>|</li>
                        <li className="page-title"><Link to="/stocks" 
                            style={{fontSize: 20, color: "black", textDecoration: 'none'}}>Stocks</Link></li>
                     </ul>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/stocks" component={Stocks}/>
                        <Route path="/history" component={StockInfo}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default Router;