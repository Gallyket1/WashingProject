import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'

class Footer extends Component{
    constructor(props){
        super(props)
    }
   render(){
       return(
           <footer>
               <div className="footer" id="footer">
                   <div className="container">
                       <div className="row">
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                               <h4> You're not ready for Gaël! </h4>
                           </div>
                           <div className="col-lg-3 col-sm-2 col-xs-3">
                               <h3> Contact </h3>
                               <ul>
                                   <li><a className="email" href="#"> gaelmukendi@yahoo.fr </a></li>
                                   <br/>
                                   <li><p> 0476860131 </p></li>
                                   <li><p>  </p></li>
                               </ul>
                           </div>
                           <div className="col-lg-3 col-sm-2 col-xs-3">
                               <ul>
                                   <li>
                                       <h5><a href="#" style={{marginTop: "5em"}}> ABOUT US</a> </h5>
                                   </li>
                                   <li>
                                       <h5><a href="#"> ALL </a> </h5>
                                   </li>
                                   <li>
                                       <h5><a href="#"> NOT ALL </a> </h5>
                                   </li>
                                   <li>
                                       <h5><a href="#"> IT'S GAEL AGAIN</a> </h5>
                                   </li>
                               </ul>
                           </div>

                       </div>
                   </div>

                   <div className="footer-bottom">
                       <div className="container">
                           <p className="pull-left copyright"> Copyright © Footer 2019. All right reserved. </p>

                       </div>
                   </div>
               </div>
           </footer>
       )
   }
}
export default Footer