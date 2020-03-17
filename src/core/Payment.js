import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import bg from '../Images/Images/bg.jpg'
import {Client} from "./Client";

import {putData} from "../Config/RestCalls";

import {PREFIX_URL} from "../Config/AuthConfig";

class Payment extends Component{
    constructor(props){
        super(props)

        this.state ={
            total:"",
            payed: "",
            reste: 0,
            account: false,
            numero_ticket: 0,
            error: "",
            goticket: "",
            retour: "",
            data: [],

        }
        this.handleChange = this.handleChange.bind(this);
        this.versTicket = this.versTicket.bind(this);
    }

    handleChange = (name) => event => {
        // Excellent way to update the state in runtime
        this.setState({
            [name]: event.target.value,
            reste: this.state.total-this.state.payed

        });
    }
    componentDidMount() {
        this.setState({
            total: localStorage.getItem('total')
        })
    }

    payerTotalite = (e) =>{
        e.preventDefault();
        this.setState({
            payed: this.state.total,
            error: "",
        })
    }

    payer60pct = (e) =>{
        e.preventDefault();
        this.setState({
            payed: Math.round(this.state.total*60/100),
            error: "",
        })
        localStorage.setItem('payed', this.state.payed);
    }
    putData = (commande, com_id) =>{
        fetch(`${PREFIX_URL}/${com_id}`, {
            method: "PUT",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"

            },
            body: JSON.stringify(commande)
        }).then(response =>{
            console.log(response.status);
            if(response.status === 200){
                response.json().then(json =>{
                    console.log(json);
                    this.setState({
                        data: json
                    })
                    if(this.state.data.id){
                        console.log(this.state.data.id);
                        localStorage.setItem('commande_id', this.state.data.id);
                        localStorage.setItem('description', this.state.data.description);
                        this.setState({
                            goticket: true
                        })
                    }
                })
            }else{
                this.setState({
                    error: "Un problème est survenu lors de la validation. \n Veuillez réessayer plus tard"
                })
            }

        }).catch(err =>{

        })
    }

    // Redirects to the next screen
    versTicket = (e) =>{
        let {total, payed} = this.state;
        const commande = {
            total: total,
            payed: payed,
            reste: total-payed,
        }
        const com_id = localStorage.getItem('commande_id');

        e.preventDefault();
        if(!this.state.payed){
            this.setState({
                error: "Le paiement n'a pas été effectué"
            })
        }else{
            this.putData(commande, com_id);
        }
    }

    // Back to the screen
    back = (e) =>{
        e.preventDefault();
        this.setState({
            retour: true,
        })
    }





    render(){
        let {total, payed, reste, account, numero_ticket, error, goticket, retour} = this.state;
        reste = total-payed;
        localStorage.setItem('reste', reste);
        localStorage.setItem('payed', payed);

        if(retour){
          return <Redirect to = "calcul/"/>
        }

        if(payed > total){
            error = "Veuillez enter un montant inférieur ou égal à " + total + " FC";
            reste = null
        }

        if(goticket){
            return (
                <Redirect to = {"/ticket"}/>
            )
        }

        return(
            <div style={{ backgroundSize: "2%", padding: '50px'}}>
                <div className={"jumbotron text-center"} style={{width: '400px', margin: '0 auto auto'}}>
                    <Client/>
                    <div className={"container"}>
                        <h3>Total à payer: </h3>
                        <br/>
                        <h3>{total + " FC"} </h3>
                    </div>

                    <br/>

                    <div className={"container"}>


                    </div>

                    &nbsp;

                    <div className={"alert alert-danger"} style={{display: error? "": "none"  }}>{error}</div>

                    <button onClick={this.payerTotalite} style={{width: '100px', height: '50px',  textAlign: "center"}} className={"bnt btn-raised btn-info"}>Totalité</button>
                    &nbsp;
                    &nbsp;
                    <button onClick={this.payer60pct} style={{width: '100px', height: '50px',  textAlign: "center"}} className={"bnt btn-raised btn-info"}>60%</button>

                    <br/>
                    <br/>
                    <br/>
                    <form>
                        <div className={"form-group"}>
                            <label >Vous payez maintenant:</label>
                            <h4> {payed} FC </h4>
                        </div>
                        <div className={"form-group"}>
                            <label >Reste à payer:</label>
                            <h4> {reste} FC </h4>
                        </div>
                        <button onClick={this.versTicket} style={{width: '100px', height: '50px',  textAlign: "center"}}
                                className={"bnt btn-raised btn-primary"}>Valider</button>
                        &nbsp;
                        &nbsp;
                        <button onClick={this.back} style={{width: '100px', height: '50px',  textAlign: "center"}}
                                className={"bnt btn-raised btn-danger"}>Retour</button>
                    </form>


                </div>

            </div>



        )
    }
}
export default Payment