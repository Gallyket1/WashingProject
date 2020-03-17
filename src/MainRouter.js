import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import React, {Component} from 'react';
import CalculPrix from './core/CalculPrix'
import Payment from './core/Payment'
import Ticket from "./core/Ticket";
import Register from "./core/Register";
import Menu from "./core/Menu";
import Suivi from "./core/Suivi";
import bg from "./Images/Images/bg.jpg";
import Footer from "./core/Footer";
import Commandes from "./core/Commandes";
import SearchPage from "./core/SearchPage";
import ModalBox from "./core/ModalBox";
import Loading from "./Loading";

class MainRouter extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div >
                <Menu />
                {this.props.loading? <Loading/> : ""}
                <Switch>
                    <Route exact path={"/"} component = {Home}/>
                    <Route exact path={"/calcul"} component = {CalculPrix} />
                    <Route exact path={"/payment"} component = {Payment} />
                    <Route exact path={"/ticket"} component = {Ticket} />
                    <Route exact path={"/register"} component = {Register} />
                    <Route exact path={"/suivi"} component = {Suivi} />
                    <Route exact path ={"/commandes"} component = {Commandes}/>
                    <Route exact path = {"/search"} component = {SearchPage}/>
                    <Route exact path = {"/modal"} component = {ModalBox}/>

                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default MainRouter