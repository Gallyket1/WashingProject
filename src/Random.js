import Loading from "./Loading"
import axios from "axios";
import React, {Component} from 'react';

class Random extends Component{
    constructor(props){
        super(props)

        //state
        this.state ={
            users: [],
            loading: false
        };
        // Binding unknown method
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUsers(){
        this.setState({
            loading: true
        })
        axios('https://api.randomuser.me')
            .then(response => this.setState({
                //very handy truick
                users: [...this.state.users, ...response.data.results],
                loading: false,
            }))

    }

    UNSAFE_componentWillMount() {
        this.getUsers();
    }
    handleSubmit(e){
        e.preventDefault();
        this.getUsers();
        console.log("Hello, I'm there");
    }

    render(){
        // Destructuring
        const {loading, users} =this.state;
        return (
            <div className="container">
                {loading? <Loading/>: users.map(user =>
                    <div key={user.id.value}>
                        <h2 style={{color: "red"}}> {user.name.last}, {user.name.first}:</h2>
                        <a ref={user.picture.large}>
                            {user.picture.large}
                        </a>
                        <form onSubmit={this.handleSubmit}>
                            <input type="submit" value={"More about " + user.name.first}/>
                        </form>
                    </div>)}
            </div>
        );
    }
}

export default Random

