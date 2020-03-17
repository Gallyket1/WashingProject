import React, { Component } from 'react';

export default class Details extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let v = "";
        //const j = "h";
        if(this.props.data.description){
             v = "h" + String(this.props.data.id);
        }
        return (
            <div className="container">
                <button className={"btn btn-raised btn-warning"} data-toggle="modal" data-target = {"#" + v}>
                    {this.props.consult? "Voir détails": "Détails"}
                </button>

                <div className="modal fade" id={v}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-danger">
                                <h4 className="modal-title">Commande n° {this.props.data.numToShow}</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body container">
                                <ul >
                                    <li className="list-group-item">Description: <i className={"text-info"}> {this.props.data.description}</i> </li>
                                    <li className="list-group-item">Frais:<i className={"text-info"}> {Math.round(this.props.data.total)} FC </i></li>
                                    <li className="list-group-item">Payé:<i className={"text-info"}> {Math.round(this.props.data.payed)} FC</i></li>
                                    {this.props.consult ? <li className="list-group-item">Reste à payer: <i className={"text-info"}>
                                        {Math.round(this.props.data.reste)} FC</i></li>: ""}
                                    <li className="list-group-item">Personne de contact: <i className={"text-info"}> Gaël M.</i></li>
                                </ul>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        )
    }
}