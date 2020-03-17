import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter} from "react-router-dom";
import MainRouter from "./MainRouter";



class App extends Component {
    render() {
        return(
           <BrowserRouter>
               <MainRouter/>
           </BrowserRouter>
        )
    }
}

export default App;
