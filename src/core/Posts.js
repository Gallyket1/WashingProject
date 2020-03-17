
// 2a for 2 arguments
export const postData2a = (commande, user_id) =>{
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
