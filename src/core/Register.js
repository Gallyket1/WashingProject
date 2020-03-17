import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import habits from './habits.PNG'
import logo192 from './logo192.png'
import bg2 from '../Images/Images/bg2.jpg'
import bg5 from "../Images/Images/bg5.jpg";
import Promo from "./Promo";
import {MessageErreur} from "./MessageErreur";



class Register extends Component{
    constructor(props){
        super(props)
        this.state ={
            name: "",
            address: "",
            commune: "",
            phone: "",
            redirection: '',
            client: "",
            annuler: false

        }
    }

    handleChange = (name) => event => {
        // Excellent way to update the state in runtime
        this.setState({
            [name]: event.target.value,
            errorMessage: "",

        });
        if(this.state.client){
            this.setState({
                name: "",
                address: "",
                phone: "",
                commune: "",
                errorMessage: "",
                data : [],
            })
        }
    }
    goHome = (e) =>{
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
      const rep = confirm("Voulez-vous vraiment annuler ?");
        if(rep === true){
            this.setState({
                annuler: true
            });
            localStorage.clear();
        }

    }

    communegiver = () =>{
        return (
            ["Lemba", "Limete", "Matete"]
        )
    }
    submitForm = (e) => {
        e.preventDefault();
        const {data, client, name, address, commune, phone} = this.state;
        const user = {
            nom: name,
            adresse: address,
            commune: commune,
            phone: phone,
        }

        if(client){
            fetch(`http://localhost:8080/api/user/${client}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(response => {
                response.json().then(json => {
                    console.log(json)
                    this.setState({
                        data: json,
                    });
                    if(this.state.data.numClient !== null){
                        localStorage.setItem('client_id', this.state.data.numClient);
                        localStorage.setItem('Nom', this.state.data.nom);
                        localStorage.setItem('Adresse', this.state.data.adresse);
                        localStorage.setItem('Téléphone', this.state.data.phone);
                        this.setState({
                            redirection: true
                        })
                    }
                    else if(this.state.data.errorMessage !== null ){
                        localStorage.clear();
                        this.setState({
                            errorMessage: this.state.data.errorMessage,

                        });
                        console.log(this.state.data.errorMessage)
                    }
                })
                //localStorage.setItem('user_id', );
            }).catch(err => {
                console.log(err)
            });
        }
        else{
            fetch("http://localhost:8080/api/user/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(response => {
                response.json().then( json =>{
                    this.setState({
                        data: json
                    });
                    if(this.state.data.numClient !== null){
                        localStorage.setItem('client_id', this.state.data.numClient);
                        localStorage.setItem('Nom', this.state.data.nom);
                        localStorage.setItem('Adresse', this.state.data.adresse);
                        localStorage.setItem('Téléphone', this.state.data.phone);
                        this.setState({
                            redirection: true
                        })
                    }
                    else if(this.state.data.errorMessage !== null ){
                        this.setState({
                            errorMessage: this.state.data.errorMessage
                        });
                        localStorage.clear();
                        console.log(this.state.data.errorMessage)
                    }
                })
                console.log();
            }).catch(err => {
                console.log(err)
            });
        }


        //return(
          ///  <Redirect to = "/calcul"/>
            ///)
    };


    componentDidMount() {
        // eslint-disable-next-line valid-typeof
        if(localStorage.getItem('Nom')){
            console.log(localStorage.length);
            this.setState({
                name: localStorage.getItem('Nom'),
                address: localStorage.getItem('Adresse'),
                phone: localStorage.getItem('Téléphone')

            })
        }

    }

    render() {

        let {errorMessage, name, address, commune, phone, client, redirection, annuler} =  this.state;
        const com = this.communegiver();
        let b  = com.map(x => <option > {x} </option>);
        const ClientNumOnly = client? true: false;
        const disableClientNum = !!(name || address || commune || phone);

        if(redirection){
            return(
              <Redirect to = "/calcul"/>
            )
        }
        if(annuler){
            return <Redirect to = "/"/>
        }

        return(
            <div style={{ backgroundImage: `url(${bg5})`, backgroundSize: "80%", padding: '50px'}}>
                <div className={"jumbotron text-center"} style={{width: '500px',  margin: '0 auto auto'}}>
                    <div className={"container" }>
                        <MessageErreur message_erreur = {errorMessage}/>
                        <h3>Identification du client</h3>
                        <br/>
                        <form >

                            <div className={"form-group"}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className={"form-group"}>
                                                <label className={"text-muted"}>Nom complet</label>

                                                <input readOnly={ClientNumOnly}
                                                       placeholder={"Ex: Michel Amisi"}
                                                       style={{width: '236.8px',  textAlign: "center"}}
                                                       value={name} onChange={this.handleChange("name")} type={"text"} className={"form-control"}/>
                                            </div>
                                        </td>
                                        OU
                                        <td>
                                            <div className={"form-group"}>
                                                <label className={"text-muted"}>Numéro client  </label>
                                                <input readOnly={disableClientNum}
                                                       placeholder={"Ex: 161"}
                                                    value={client} onChange={this.handleChange("client")} type={"text"} className={"form-control"}/>
                                            </div>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className={"form-group"}>
                                <label className={"text-muted"}>Adresse</label>
                                <input readOnly={ClientNumOnly} value={address}
                                       onChange={this.handleChange("address")}
                                       placeholder={"Ex: Rue Musualu 21"}
                                       type={"address"} className={"form-control"}/>
                            </div>
                            <div className={"form-group"} >
                                <label className={"text-muted"}>Commune</label>
                                <select readOnly={ClientNumOnly} className={"form-control"}
                                        placeholder={"Choisir une commune"}
                                        onChange={this.handleChange("commune")}
                                        value={commune}>
                                    <option >{"---"}</option>
                                    {b}
                                </select>
                            </div>
                            <div className={"form-group"}>
                                <label className={"text-muted"}>Téléphone</label>
                                <input  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        placeholder={"Ex: 0815257314"}
                                    readOnly={ClientNumOnly} value={phone} onChange={this.handleChange("phone")} type={"float"} className={"form-control"}/>
                            </div>
                            <button className={"bnt btn-raised btn-primary"} onClick={this.submitForm}>Etape suivante</button>
                            &nbsp; &nbsp;
                            <button className={"bnt btn-raised btn-danger"} onClick= {this.goHome}>Annuler</button>
                        </form>
                    </div>



                </div>
            </div>
        )
    }
}
export default Register