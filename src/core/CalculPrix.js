import  React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { MDBSpinner } from 'mdbreact';
import { ClipLoader } from 'react-spinners';
import  habits from './habits.PNG'
import bg3 from '../Images/Images/bg3.jpg'
import bg from "../Images/Images/bg.jpg";
import Promo from "./Promo";
import {Client} from "./Client";




class CalculPrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prix_par_kilo: "",
            kilos: "",
            name: "",
            articles: "",
            description: "",
            reduction: "",
            code_reduction: "",
            prix_total: "",
            error: null,
            redirection: false,
            loading:true,
            retour: false,
            annuler: false,
            data: []


        }
        this.handleChange = this.handleChange.bind(this)
        this.annuler = this.annuler.bind(this)

    }
    handleChange = (name) => event => {
        let {prix_par_kilo, kilos, reduction, code_reduction, prix_total, error} = this.state;
        this.setState({
            error: "",
        })
        // Excellent way to update the state in runtime
        this.setState({
                [name]: event.target.value,
            prix_total: Math.ceil(prix_par_kilo*kilos*(1-(reduction)/100))

        });


}
    postData = (commande, user_id) =>{
        fetch(`http://localhost:8080/api/user/${user_id}`, {
            method: "POST",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"

            },
            body: JSON.stringify(commande)
        }).then(response =>{
            console.log(response.status);
            if(response.status === 201){
                response.json().then(json =>{
                    console.log(json);
                    this.setState({
                        data: json
                    })
                    if(this.state.data.id){
                        localStorage.setItem('commande_id', this.state.data.id);
                        localStorage.setItem('commande_num', this.state.data.numToShow);
                        this.setState({
                            redirection: true
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

    handleClick = () => {
        this.setState({
            error: null
        })
    }
    submitForm =(e) =>{
        e.preventDefault();
        let {prix_par_kilo, kilos, reduction, code_reduction, error, description, articles, prix_total} = this.state;
        if(!prix_par_kilo | !kilos | !articles | !description){
            this.setState({
                error: "Veuillez remplir tous les champs obligatoires"
            })
        }else{
            const commande = {
                prixKilo: prix_par_kilo,
                kilos: kilos,
                codeReduction: code_reduction,
                reduction: reduction,
                description: description,
                total:  localStorage.getItem('total')
            }
            const id_user = localStorage.getItem('client_id');
            this.postData(commande, id_user);

        }



    }
    retour = () => {
        this.setState({
            retour: true
        })
    }
    annuler = (e) =>{
        e.preventDefault();
        this.setState({
            annuler: true
        })
    }

    render()

    {
        if(this.state.redirection){
            return(
                <Redirect to = "/payment"/>
                )

        }if(this.state.retour){
            return <Redirect to = "/register"/>
        }if(this.state.annuler){
        // eslint-disable-next-line no-restricted-globals
            const rep =  confirm('Voulez-vous vraiment annuler la commande ? \n ' +
                'Si vous clickez sur OK, toutes les \n' +
                'données de la commande seront perdues');
            this.setState({
                annuler: false
            })
            if(rep === true){
                localStorage.clear();
                return <Redirect to = "/"/>
            }

            //return <Redirect to = "/"/>
    }
        let {prix_par_kilo, kilos, reduction, code_reduction, prix_total, error, nom, description, articles} = this.state;

        if(kilos >= 10){
            reduction = 15;
        }

        if(reduction>100){
            reduction = 0;
            error = "La réduction doit être inférieure à 100%"

        }



        const total = Math.floor(prix_par_kilo*kilos*(1-(reduction)/100));
        localStorage.setItem('total', total);
        return (
            <div style={{ backgroundImage: `url(${bg3})`, backgroundSize: "100%", padding: '50px'}}>
                <div className={"jumbotron text-center"} style={{width: '580px',  margin: '0 auto auto'}}>
                    <Client/>
                    <div className={"alert alert-danger"} style={{display: error? "": "none"  }}>{error}</div>

                    <form style={{width: '500px',  textAlign: "center", margin: '0 auto'}}>
                        <h2 className={"at-5 mb-5"}>Calcul du prix total</h2>
                        <div className={"form-group"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}>Prix par kg</label>
                                            <input
                                                   style={{width: '236.8px',  textAlign: "center"}}
                                                   value={prix_par_kilo} onChange={this.handleChange("prix_par_kilo")} type={"number"} className={"form-control"}/>
                                        </div>
                                    </td>
                                    &nbsp;
                                    &nbsp;
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}>Kilos</label>
                                            <input placeholder={"Ex: 10"}
                                                value={kilos} onChange={this.handleChange("kilos")}
                                                type={"number"} className={"form-control"}/>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className={"form-group"}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}>Nombre d'articles</label>
                                            <input placeholder={"Ex: 5"}
                                                style={{width: '236.8px',  textAlign: "center"}}
                                                value={articles} onChange={this.handleChange("articles")} type={"number"} className={"form-control"}/>
                                        </div>
                                    </td>
                                    &nbsp;
                                    &nbsp;
                                    <td>
                                        <div className={"form-group"}>
                                            <label className={"text-muted"}>Code réduction</label>
                                            <input placeholder={"Ex: CH1850"}
                                                value={code_reduction} onChange={this.handleChange("code_reduction")}
                                                type={"text"} className={"form-control"}/>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className={"form-group"}>
                            <label className={"text-muted"}>Description</label>
                            <input placeholder={"Ex: 5 chemises, 3 robes, 1 pantalon"}
                                value={description} onChange={this.handleChange("description")}
                                   type={"text"} className={"form-control"}/>
                        </div>
                        <div className={"form-group"}>
                            <label className={"text-muted"}>Réduction</label>
                            <input value={reduction} onChange={this.handleChange("reduction")} type={"number"} className={"form-control"}/>
                        </div>
                        <div className={"form-group"}>
                            <label className={"text-muted"}>Prix total</label>
                            <h4>{total}</h4>
                        </div>
                        <button className={"bnt btn-raised btn-success"} onClick={this.submitForm}>Etape suivante</button>
                        &nbsp;
                        &nbsp;
                        <button className={"bnt btn-raised btn-primary"} onClick={this.retour}>Retour</button>
                        &nbsp;
                        &nbsp;
                        <button className={"bnt btn-raised btn-danger"} onClick={this.annuler}>Annuler</button>
                    </form>
                    <br/>
                    <div className={"alert alert-danger"} style={{display: error? "": "none"  }}>{error}</div>
                </div>
            </div>
        )


    }
}
export default CalculPrix