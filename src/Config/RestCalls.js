import {PREFIX_URL} from "./AuthConfig";

export const  putData = (commande, com_id) =>{
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