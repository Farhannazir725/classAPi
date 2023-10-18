
import './App.css';
import React, { Component } from 'react'
import NavBar  from './components/NavBar';
import News  from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";



export default class App extends Component {
  pageSize = 7;
  apikey = process.env.REACT_APP_NEWS_API
  state = {
    progress:0
  }
  setProgress = (progress)=>{
   this.setState({progress: progress})
  }
  render() {
      
    return (
      
      <div>
        <Router>
       <NavBar/>
       <LoadingBar
        height={2}
        color='#f11946'
        progress={100}
        
      />
       
       <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general"/> </Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apikey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business"/> </Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/> </Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health"/> </Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general"/> </Route>
          <Route exact path="/science"><News setProgress={this.setProgress}  apikey={this.apikey}key="science" pageSize={this.pageSize} country="in" category="science"/> </Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apikey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports"/> </Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apikey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology"/> </Route>
          
        </Switch>
       </Router>
      </div>
      
    )
  }
}

// bfdb342ffa544d8aa3e759af9ac427c4