import React, {Component} from "react";

export class ModifCommande extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={"table"}>
                <table>
                    <thead>
                    <tr>
                        <th scope={"col"}>N° de commandes </th>
                        <th scope={"col"}>Client</th>
                        <th scope={"col"}>Statut</th>
                        <th scope={"col"}> Solde </th>
                        <th scope={"col"}> Date de création </th>
                        <th scope={"col"}> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.data_in_modif.cmd.numToShow}</td>
                        <td>{this.props.data_in_modif.clientNAme}</td>
                        <select color={""} defaultValue={this.props.data_in_modif.cmd.statut.statusName}
                                className="browser-default custom-select text-success"
                                onChange={this.props.handleChange("actual_statut")}>
                            {this.props.stats}
                        </select>
                        <td>{this.props.data_in_modif.cmd.reste}</td>
                        <td>{this.props.data_in_modif.cmd.dateCreat}</td>
                        <button className={"btn btn-raised btn-primary"} onClick={this.props.terminer}>Terminer</button>
                        &nbsp;
                        <button className={"btn btn-raised btn-danger"} onClick={this.props.annuler}>Annuler</button>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}