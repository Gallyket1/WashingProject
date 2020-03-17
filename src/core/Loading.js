import React, { Component } from 'react';

export class Loading extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
           <div className={"container text-center"}>
               <h3> Veuillez patienter</h3>
               <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                   <span className="sr-only">Loading...</span>
               </div>
               <div className="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                   <span className="sr-only">Loading...</span>
               </div>
           </div>
        )
    }
}