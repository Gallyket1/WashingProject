import React, { Component } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import Details from "./Details";


let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

 export default class ModalBox extends Component {
    constructor() {
        super();
        this.state = {
            todos: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','T','v','u','w','x','y','z', 'ui', 'ubb'],
            currentPage: 1,
            todosPerPage: 5,


        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id)
        });
        localStorage.setItem('resPage', event.target.id);
    }

    handleLastClick(event) {
        event.preventDefault();
        this.setState({
            currentPage:last
        });
    }
    handleFirstClick(event) {
        event.preventDefault();
        this.setState({
            currentPage:1
        });
    }

    componentDidMount(): void {
        if(localStorage.getItem('resPage')){
            this.setState({
                currentPage: localStorage.getItem('resPage'),
            })
        }
    }


     render() {
        let { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        let indexOfLastTodo = currentPage * todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        let currentCmd = [];
        if(this.props.data){
            currentCmd = this.props.data.slice(indexOfFirstTodo, indexOfLastTodo);
            last = Math.ceil(this.props.data.length/todosPerPage);

        }
        prev  = currentPage > 0 ? (currentPage -1) :0;
        next  = (last === currentPage) ?currentPage: currentPage +1;

        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <=last; i++) {
            pageNumbers.push(i);
        }
        let comds = [];

        if(this.props.data){
             comds = currentCmd.map( (x, i) =>

                <tr key = {i}>
                    <td>{x.cmd.numToShow}</td>
                    <td>{x.clientNAme}</td>
                    <td>{x.cmd.statut.statusName}</td>
                    <td>{x.cmd.reste}</td>
                    <td>{x.cmd.dateCreat}</td>
                    <td> <Details data = {x.cmd} />  </td>
                    <td>
                        {x.cmd.statut.id !== 5?
                            <button value={x.cmd.id}
                                    onClick={this.props.editCommande("id_modif")}
                                    className={"btn btn-raised btn-primary"}>
                                Modifer
                            </button>: "Cloturée"}
                    </td>
                </tr>, );
        }

        let styles = {color: ''};

        return (
            <div className={"text-center"} style={{width: '800px'}}>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th style={styles} scope={"col"}>N° de commandes </th>
                        <th style={styles} scope={"col"}>Client</th>
                        <th style={styles} scope={"col"}>Statut</th>
                        <th style={styles} scope={"col"}> Solde </th>
                        <th style={styles} scope={"col"}> Date de création </th>
                        <th style={styles} scope={"col"}> Voir Détails </th>
                        <th style={styles} scope={"col"}> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                    {comds}
                    </tbody>
                </table>
                &nbsp;
                <ul id="page-numbers">
                <nav>
                    <Pagination>
                        <PaginationItem>
                            { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                                <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                            }
                        </PaginationItem>
                        <PaginationItem>
                            { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                                <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                            }
                        </PaginationItem>
                        {
                            pageNumbers.map((number,i) =>
                                <Pagination key= {i}>
                                    <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                                        <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                            )}

                        <PaginationItem>
                            {
                                currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                                    <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                            }
                        </PaginationItem>

                        <PaginationItem>
                            {
                                currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                                    <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                            }
                        </PaginationItem>
                    </Pagination>
                </nav>
            </ul>
                &nbsp;
                <button className={"btn btn-raised btn-secondary"} onClick={this.props.newSearch}>Nouvelle recherche</button>
            </div>
        );
    }
}