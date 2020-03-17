import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'

export default class Promo extends Component{
    constructor(props){
        super(props)
        this.state= {
            promo: ""
        }
    }
    render() {
        return(
            <div id={"container_2"} className={"jumbotron"} style={{width: '200px', height: '220px'}}>
                <h4 style={{textDecorationColor: "red"}}> code promo </h4>
                <h1 style={{color: "red"}}> 2GAM02 </h1>
            </div>
        )
    }

}