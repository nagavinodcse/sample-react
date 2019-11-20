import React, {Component} from 'react';
import AppHeader from "./AppHeader";
import Main from "./Main";

class App extends Component
{
    render()
    {
        return (
            <div className="App">
                <AppHeader/>
                <div className="container">
                    <Main/>
                </div>
            </div>
        );
    }
}

export default App;
