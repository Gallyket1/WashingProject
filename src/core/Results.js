import React, {Component} from "react";
import {Button} from "react-bootstrap";
import ModalBox from "./ModalBox";

export class Results extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let styles = {color: ''};
        return(
            <div className={"text-center"} style={{width: '800px'}}>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th style={styles} scope={"col"}>N° de commandes </th>
                        <th style={styles} scope={"col"}>Client</th>
                        <th style={styles} scope={"col"}>Statut</th>
                        <th style={styles} scope={"col"}> Solde </th>
                        <th style={styles} scope={"col"}> Date de création </th>
                        <th style={styles} scope={"col"}> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.comds}
                    </tbody>
                </table>
                &nbsp;
                <button className={"btn btn-raised btn-secondary"} onClick={this.props.newSearch}>Nouvelle recherche</button>
            </div>
        )
    }
}