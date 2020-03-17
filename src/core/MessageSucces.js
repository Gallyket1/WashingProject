import  React, {Component} from "react";

export class MessageSucces extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return  <div className={"alert alert-success text-center"} style={{display: this.props.message_succes != ""? "": "none"  }}>
            {this.props.message_succes}
            <div>
                {this.props.retourable ? <button onClick={this.props.back}> Retour </button>: " "}
            </div>
        </div>
    }
}