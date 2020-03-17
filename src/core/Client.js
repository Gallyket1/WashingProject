import React from 'react'

export const Client = () =>{
    return(
        <p> Client: <i style={{color: "red"}}>
            {localStorage.getItem('Nom')} (Num client: {localStorage.getItem('client_id')})</i> </p>
    )
}