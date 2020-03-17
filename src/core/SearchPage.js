import React, {Component} from "react";
import {PREFIX_URL} from "../Config/AuthConfig";

export default class SearchPage extends Component{
    constructor(props){
        super(props)

    }

    handleChange = (name) => event => {
        // Excellent way to update the state in runtime
        this.setState({
            [name]: event.target.value,
        });


    }

    render() {
        return (
            <div style={{ padding: '50px'}}>
                <div className={"jumbotron text-center"} style={{width: '500px', margin: '0 auto auto', padding: '50px'}}>
                    <h2> Rechercher commande </h2>
                    <form >
                        <div className={"form-group"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}> Numéro de commande </label>
                                            <input onChange={this.props.handleChange("com")}
                                                   style={{width: '236.8px',  textAlign: "center"}}
                                                   placeholder={"Ex: QR20204C301"}
                                                   value={this.props.com}  type={"text"} className={"form-control"}/>
                                        </div>
                                    </td>
                                    &nbsp; &nbsp;
                                    &nbsp;
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}> Nom du client </label>
                                            <input onChange={this.props.handleChange("nom")}
                                                   placeholder={"Ex: Kabila "}
                                                value={this.props.nom}  type={"text"} className={"form-control"}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}> à partir de </label>
                                            <input onChange={this.props.handleChange("datum")}
                                                style={{width: '236.8px',  textAlign: "center"}}
                                                value={this.props.datum}  type={"date"} className={"form-control"}/>
                                        </div>
                                    </td>
                                    &nbsp; &nbsp;
                                    &nbsp;
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}> Statut </label>
                                            <input
                                                value={this.props.statut}  type={"text"} className={"form-control"}/>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button className={"bnt btn-raised btn-primary"} onClick= {this.props.search}>Chercher</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}