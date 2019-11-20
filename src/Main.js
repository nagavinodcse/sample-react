import React,{Component} from "react";
import { DataTable } from '@scuf/datatable';
import { Pagination,Icon,Button} from '@scuf/common';
import Form from "./Form";
import axios from 'axios';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            activePage: 1,
            rowsPerPage: 10,
            loading: false,
            totalItems:0,
            selectedItems:[],
            employee:[],
            showForm:"none"
        }
    }
    componentDidMount = () => {
        this.loadList();
    };
    loadList = () => {
        this.setState({loading:true});
        axios.get(`http://localhost:3001/employees`).then(employees=>{
            this.setState({
                totalItems: employees.data.length,
                employees: employees.data,
                loading: false,
                showForm:"none"
            });
        });
    };
    deleteEmployee = () => {
        axios.delete(`http://localhost:3001/employees/${this.state.selectedItems[0].id}`).then(()=>
            {
                this.loadList();
                this.setState({selectedItems:[]});
            });
    };
    render() {
        const Item = DataTable.ActionBar.Item;
        return (
            <div>
                <h1 className="mt-3 d-flex">Employees <span className="ml-auto"><Button content="Add Employee" onClick={() =>this.setState({showForm:"block"})} type="primary" size="small"/> </span></h1>
                <Form updateList={this.loadList} showForm={this.state.showForm}/>
                <DataTable data={this.state.employees} loading={this.state.loading} selectionMode="single" selection={this.state.selectedItems}
                           onSelectionChange={e => this.setState({ selectedItems: e })}>
                    <DataTable.ActionBar>
                        <Item
                            icon={<Icon name="delete" root="common" size="small" />}
                            content="Delete"
                            onClick={() =>
                                this.deleteEmployee()
                            }
                        />
                    </DataTable.ActionBar>
                    <DataTable.Column field="name" header="Employee"/>
                    <DataTable.Column field="designation" header="Designation"/>
                    <DataTable.Column field="skills" header="Skills"/>
                    <DataTable.Column field="domain" header="Domain"/>
                </DataTable>
                <Pagination totalItems={this.state.totalItems} itemsPerPage={this.state.rowsPerPage} showDisplayDetails boundaryRange={5} itemsPerPageOptions={[10,25,50]}
                            onPageChange={(page, itemsPerPage) => { this.setState({activePage: page, rowsPerPage: itemsPerPage});this.loadList(page, itemsPerPage); }}/>
            </div>
        )
    }
}