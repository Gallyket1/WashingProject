import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {Link} from "react-router-dom";
import divWithClassName from "react-bootstrap/cjs/utils/divWithClassName";

class Menu extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div id = "menu">
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/register"}>Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/"}>Services</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/suivi"}>Suivi de commande</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to={"/commandes"}>Commandes</Link>
                    </li>
                </ul>

            </div>
        )


    }
}
export default Menu

