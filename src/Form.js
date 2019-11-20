import React, {Component} from "react";
import {Button, Input} from '@scuf/common';
import axios from 'axios';

export default class Form extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            "name": "",
            "designation": "",
            "skills": "",
            "domain": ""
        }
    }
    componentDidMount = () => {
    };
    addEmployee = (e) =>
    {
        e.preventDefault();
        axios.post('http://localhost:3001/employees',this.state).then((data) =>
        {
            this.props.updateList();
            this.setState({"name": "",
                "designation": "",
                "skills": "",
                "domain": ""})
        })
    };

    render()
    {
        return (
            <form method="post" onSubmit={(e) => this.addEmployee(e)} style={{display:this.props.showForm}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Input value={this.state.name} onChange={(value) => this.setState({name: value})}
                           placeholder="Name" label="Name"/>
                    <Input value={this.state.designation} onChange={(value) => this.setState({designation: value})}
                           placeholder="Designation" label="Designation" error=""/>
                    <Input value={this.state.skills} onChange={(value) => this.setState({skills: value})}
                           placeholder="Skills" label="Skills" error={undefined}/>
                    <Input value={this.state.domain} onChange={(value) => this.setState({domain: value})}
                           placeholder="Domain" label="Domain" error={null}/>
                    <span className="mb-3"><Button content="Submit" type="primary" actionType="submit" size="small"/> </span>
                </div>
            </form>
        )
    }
}