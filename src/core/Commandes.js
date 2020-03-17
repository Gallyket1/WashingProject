import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {postData2a} from "./Posts";
import {MessageErreur} from "./MessageErreur";
import {ModifCommande} from "./ModifCommande";
import {Results} from "./Results";
import SearchPage from "./SearchPage";
import ModalBox from "./ModalBox";
import {MessageSucces} from "./MessageSucces";
import {Loading} from "./Loading";

export default class Commandes extends Component{
    constructor(){
        super()
        this.state = {
            data: [],
            message_erreur: "",
            id_modif: "",
            inmodif: false,
            data_modif: "",
            statut: ["Reçu", "En lavage", "En repassage", "Prêt à être retiré", "commande retirée"],
            actual_statut :"",
            retour: false,
            terminer: false,
            data_patched: [],
            searchPage: true,
            datum: "",
            com: "",
            retourable: true,
            nom: "",
            message_succes: "",
            loading: false,


        }
    }

    handleChange = (name) => event => {
        let {actual_statut} = this.state;
        this.setState({
            [name]: event.target.value,

        });

    }

    patchData = (commande, com_id) =>{
        fetch(`http://localhost:8080/api/user/modifcom/${com_id}`, {
            method: "PATCH",
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
                        data_patched: json
                    })
                    if(this.state.data_patched.id){
                        this.setState({
                            terminer: true,
                            retour: false,
                            searchPage: false
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

    search = (e) => {
        e.preventDefault();
        let {datum, nom, com} = this.state;
        if(!datum && !nom && !com){
            this.setState({
                message_erreur: 'Veuillez introduire au moins un critère de recherche.'
            })
            return;
        }else{
            if(com){
                this.setState({
                    loading: true
                })
                this.fetchDataBis(com, "");
                localStorage.setItem("searchPage", true)
                localStorage.setItem("com_num", this.state.com)

            }else{
                this.setState({
                    loading: true
                })
                this.fetchDataBis(nom, datum)
                this.setState({
                    searchPage: false
                })
                localStorage.setItem("searchPage", true)
                localStorage.setItem("datum", this.state.datum);
                localStorage.setItem("nom", this.state.nom)
            }
        }
    }


    fetchDataBis = (nom, datum) =>{
        fetch(`http://localhost:8080/api/user/search/${datum}/${nom}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.setState({
                loading: false
            })
            console.log(response.status);
            if(response.status === 200){
                response.json().then(json => {
                    console.log("hahahah");
                    this.setState({
                        data: json,
                        searchPage: false,
                    });

                })
            }else if(response.status === 204){
                this.setState({
                    message_erreur: "Aucune commande n'a été trouvée"
                })
            }
            else{
                this.setState({
                    message_erreur: "Le système a rencontré un problème, veuillez réessayer plus tard"
                })
            }

            //localStorage.setItem('user_id', );
        }).catch(err => {
            this.setState({
                loading: false,
                message_erreur: "Le système a rencontré un problème, veuillez réessayer plus tard"
            })
            console.log(err)
        });
    }

    fetchData1Arg = (com) =>{
        fetch(`http://localhost:8080/api/user/statut/${com}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            this.setState({
                loading: false
            })
            console.log(response.status)
            if(response.status === 200){
                response.json().then(json => {
                    console.log("hahahah")
                    this.setState({
                        data: json,
                        searchPage: false,
                    });

                })
            }else if(response.status === 204){
                this.setState({
                    message_erreur: "Aucune commande n'a été trouvée"
                })
            }
            else{
                this.setState({
                    message_erreur: "Le système a rencontré un problème, veuillez réessayer plus tard"
                })
            }

            //localStorage.setItem('user_id', );
        }).catch(err => {
            this.setState({
                loading: false,
                message_erreur: "Le système a rencontré un problème, veuillez réessayer plus tard"

            })
            console.log(err)
        });
    }

    fetchData = () =>{
        fetch("http://localhost:8080/api/user/", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.status)
            if(response.status === 200){
                response.json().then(json => {
                    console.log(json)
                    this.setState({
                        data: json,
                    });

                })
            }else if(response.status === 204){
                this.setState({
                    message_erreur: "Aucune commande n'a été trouvée"
                })
            }
            else{
                this.setState({
                    message_erreur: "Le système a rencontré un problème, veuillez réessayer plus tard"
                })
            }

            //localStorage.setItem('user_id', );
        }).catch(err => {
            console.log(err)
        });
}

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
            setTimeout(() => this.setState({message:''}), 3000);
    }


    componentDidMount() {
        if(localStorage.getItem("searchPage")){
            if(localStorage.getItem("com_num")){
                this.fetchDataBis(localStorage.getItem("com_num"), "");
            }else
                this.fetchDataBis(localStorage.getItem("datum"),  localStorage.getItem("nom"));
        }
        setTimeout(() => localStorage.setItem('success', ""), 3500);
    }

    editCommande = (name) => event => {
        // Excellent way to update the state in runtime
        this.setState({
            [name]: event.target.value,
            inmodif: true

        });
    }
    annuler = () =>{
        let {actual_statut, id_modif,statut, retour} = this.state;
        this.setState({
            inmodif: false,
            retour: true,
            terminer: false,
            actual_statut: ""
        })
    }

    terminer = (e) =>{
        e.preventDefault();
        let {actual_statut, id_modif, statut} = this.state;

        if(!actual_statut){
            window.location.reload()
            localStorage.setItem('success', "Acune modification n'a été apportée à la commande !")

        }

        else if(actual_statut == statut[4]){
            // eslint-disable-next-line no-restricted-globals
            let rep = confirm("Vous êtes sur le point de clôturer cette commande. \n " +
                "Appuyer sur OK pour confirmer.")
            if(rep === false){
                return
            }else{
                const k = statut.indexOf(actual_statut);
                console.log(k);

                let commande = {
                    statut:{
                        id: k+1,
                        statusName: actual_statut
                    }

                }
                this.patchData(commande, id_modif);
                window.location.reload();
                localStorage.setItem('success', "La commande a été modifiée avec succès")
            }
        }

        else{
            const k = statut.indexOf(actual_statut);
            console.log(k);

            let commande = {
                statut:{
                    id: k+1,
                    statusName: actual_statut
                }

            }
            this.patchData(commande, id_modif);
            window.location.reload();
            localStorage.setItem('success', "La commande a été modifiée avec succès !")
        }

    }

    newSearch = (e) =>{
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }

    render() {

        let {data, message_erreur, inmodif, id_modif,
            data_modif, statut, actual_statut, retour, terminer,
            searchPage, com, datum, retourable, nom, loading} = this.state;

        let stats = statut.map(y =>
                    <option>{y}</option>
        )

        let comds = data.map( x =>
            <tr>
                <td>{x.cmd.numToShow}</td>
                <td>{x.clientNAme}</td>
                <td>{x.cmd.statut.statusName}</td>
                <td>{x.cmd.reste}</td>
                <td>{x.cmd.dateCreat}</td>
                {x.cmd.statut.id !== 5? <button value={x.cmd.id}
                                                onClick={this.editCommande("id_modif")}
                                                className={"bnt btn-raised btn-primary"}
                >Modifer</button>: ""}
            </tr>



        )
        if(message_erreur){
            return(
               <MessageErreur
                   message_erreur = {this.state.message_erreur}
                   retourable = {retourable}
                   back = {this.newSearch}
               />
            )
        }
        else if(searchPage && !localStorage.getItem("searchPage")){
            return <SearchPage
                com = {com}
                datum = {datum}
                handleChange = {this.handleChange}
                search = {this.search}
                nom={nom}

            />
        }else if(searchPage && localStorage.getItem("searchPage")){
            return (<div>
                <MessageSucces message_succes = {this.state.message_succes}/>
                <ModalBox

                    data = {this.state.data}
                    newSearch = {this.newSearch}
                    editCommande ={this.editCommande}
                />
            </div>)

        }
        else if(inmodif){
            let data_in_modif = "";
            for(let i = 0; i < data.length; i++){
                if(data[i].cmd.id.toString() === id_modif){
                    data_in_modif = data[i];
                    break;
                }
            }
            return (
                <ModifCommande
                    data_in_modif = {data_in_modif}
                    comds = {comds}
                    terminer = {this.terminer}
                    annuler = {this.annuler}
                    handleChange = {this.handleChange}
                    stats = {stats}
                />
            )
        }

        else return(
            <div>
                {loading? <Loading/>:
                <div>
                    <MessageSucces message_succes = {localStorage.getItem("success")}/>
                    <ModalBox

                        data = {this.state.data}
                        newSearch = {this.newSearch}
                        editCommande ={this.editCommande}
                    />
                </div>}

            </div>

        )
    }

}