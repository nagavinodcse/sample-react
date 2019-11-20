import React,{Component} from "react";
import { Header } from '@scuf/common';
export default class AppHeader extends Component {
    render() {
        return (
            <Header title="BRIDGE" className='container-fluid' responsive={true} isForge='true'/>
        )
    }
}