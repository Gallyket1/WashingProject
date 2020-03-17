import  React, {Component} from "react";

export class MessageErreur extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return  <div className={"alert alert-danger text-center"} style={{display: this.props.message_erreur? "": "none"  }}>
            {this.props.message_erreur}
            <br/>
            <br/>
          <div>
              {this.props.retourable ? <button className={"btn btn-raised btn-info"} onClick={this.props.back}> Retour </button>: " "}
          </div>
        </div>
    }
}

