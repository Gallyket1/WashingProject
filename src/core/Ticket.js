import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {Client} from "./Client";

class Ticket extends Component{
    constructor(props){
        super(props);
        this.state ={
            description: "",
            num_commande: "",
            montant_payed: "",
            reste: "",
            message: false,
            printed: false,
            finished: false,
        }
    }

    componentDidMount() {
        this.setState({
            description: localStorage.getItem('description'),
            num_commande: localStorage.getItem('commande_num'),
            reste: localStorage.getItem('reste'),
            montant_payed: localStorage.getItem('payed')
        });
    }
    terminer = () =>{
        this.setState({
            finished: true
        })
        localStorage.clear()
    }

    msg = () =>{
        return
    }

    imprimer =() =>{
        this.setState({
            printed: true
        })
        window.print();
    }




    render() {
        let{num_commande, montant_payed, reste, description, printed, finished, message} = this.state;

        if(finished){
          return  <Redirect to = "/"/>
        }

        return(
            <div>
                <div className={"jumbotron text-center"}>
                    <Client/>
                    <div className="modal-body container" style={{width: '700px'}}>
                        <ul >
                            <li className="list-group-item">Numéro de commande: <i className={"text-info"}> {num_commande}</i> </li>
                            <li className="list-group-item">Vous nous avez remis: <i className={"text-info"}> {description} </i></li>
                            <li className="list-group-item">Montant payé: <i className={"text-info"}> {montant_payed} FC</i></li>
                            <li className="list-group-item">Reste à payer:  <i className={"text-info"}> {reste} FC</i></li>
                        </ul>
                    </div>

                    <div id = "bouton">
                        <button onClick={this.imprimer}
                                className={"bnt btn-raised btn-info"}>
                            Imprimer
                        </button>
                        &nbsp;
                        &nbsp;
                        <button onClick={this.msg}
                                className={"bnt btn-raised btn-primary"}>
                            Message
                        </button>
                        &nbsp;
                        &nbsp;
                        <button onClick={this.terminer}
                                className={"bnt btn-raised btn-warning"}>
                            Terminer
                        </button>
                    </div>


                </div>
                <div>

                </div>
            </div>
        )
    }
}
export default Ticket