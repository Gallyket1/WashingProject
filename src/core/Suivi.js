import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import Details from "./Details";
import {Loading} from "./Loading";

class Suivi extends Component{
    constructor(props){
        super(props)
        this.state ={
            numero: "",
            statut: "",
            message_erreur: "",
            retour: false,
            init: true,
            gohm: false,
            data: [],
            enSuivi: true,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (name) => event => {
        // Excellent way to update the state in runtime
        this.setState({
            [name]: event.target.value,


        });
    };

    getData = (cmd_id) =>{
        fetch(`http://localhost:8080/api/user/statut/${cmd_id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.setState({
                loading: false
            })
            this.setState({loading: false})
            if(response.status === 200){
                response.json().then(json => {
                    console.log(json)
                    this.setState({
                        data: json,
                    });
                    if(this.state.data.statut.id){
                        this.setState({
                            statut: this.state.data.statut.statusName
                        })
                    }else{
                        this.setState({
                            message_erreur: "Le paiement n'a pas été effectué pour cette commande"
                        })
                    }

                })
            }else if(response.status === 404){
                this.setState({
                    message_erreur: "Le numéro de commande " + this.state.numero + " n'existe pas"
                })
            }
            else{
                this.setState({
                    message_erreur: "Le système a rencontré une erreur, veuillez réessayer plus tard"
                })
            }

            //localStorage.setItem('user_id', );
        }).catch(err => {
            this.setState({
                loading: false,
                message_erreur: "Le système a rencontré une erreur, veuillez réessayer plus tard"
            })
            console.log(err)
        });
    }

    verifier = (e) =>{
        e.preventDefault();
        // Normally we have to do a fetch()
        let {numero} = this.state;

        // This is just for simulation in front End
        if(!this.state.numero){
            this.setState({
                message_erreur: "Le numéro de commande est vide",
                retour: false
            })
        }
        else{
            this.setState({
                loading: true
            })
           this.getData(numero);
        }

    };
    retour = () =>{
        this.setState({
            statut: "",
            retour: true,
            numero: "",
            message_erreur: "",

        })
    };
    goHome = () =>{
        this.setState({
            statut: "",
            retour: false,
            numero: "",
            message_erreur: "",
            gohm: true,

        })
    }
    render(){
        let {numero, message_erreur, statut, retour, init, gohm, loading} = this.state;

        if(gohm){
            return(
                <Redirect to ={"/"}/>
            )
        }

        else if(statut){
            return(
                <div className={"jumbotron text-center"} >
                    <h2> Statut de votre commande: {statut} </h2>
                    <Details data = {this.state.data} consult = {this.state.enSuivi}/>
                    <br/>
                    <button  className={"bnt btn-raised btn-primary"} onClick={this.retour}>Suivre une autre commande</button>
                    &nbsp;
                    <button  className={"bnt btn-raised btn-danger"} onClick={this.goHome}>Accueil</button>
                </div>
            )
        }
        else if(message_erreur){
            return(
                <div className={"jumbotron text-center"} >
                    <div className={"alert alert-danger"} >{message_erreur}</div>
                    <br/>
                    <button  className={"bnt btn-raised btn-primary"} onClick={this.retour}>Réessayer</button>
                    &nbsp;
                    <button  className={"bnt btn-raised btn-danger"} onClick={this.goHome}>Accueil</button>
                </div>
            )
        }
        else {
            return(
                <div className={"jumbotron text-center"} >
                    {loading? <Loading/>:
                    <form style={{width:'500px', margin:'0 auto'}}>
                        <div className={"form-group"} >
                            <label >Numéro de commande</label>

                            <input
                                type={"text"}
                                   onChange={this.handleChange("numero")}
                                   className={"form-control"} value={numero}
                            />
                            <br/>
                            <button  className={"bnt btn-raised btn-primary"} onClick={this.verifier}>Vérifier Statut</button>
                        </div>

                    </form>}
                </div>
            )
        }

    }
}
export default Suivi