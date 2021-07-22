import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from './app-header.js';
import SideBar from './side-bar.js';
import TodoList from './todo-list.js';

class AppBaseStructure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSideBar: false,
            listTitle: "TODO",
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        if(window.innerWidth >= 992) {
            this.setState({openSideBar: true});
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    toggleSideBar = () => {
        this.setState({openSideBar: !this.state.openSideBar});
        console.log(this.state.openSideBar);
    }

    setListTitle = (title) => {
        if(title) {
            this.setState({listTitle: title})
        }
    }

    render() {
        let sidebar = <SideBar />;
        if(!this.state.openSideBar && window.innerWidth<992) {
            sidebar='';
        }
        return (
            <>
                <nav>
                    <AppHeader listTitle={ this.state.listTitle } toggleSideBar={ this.toggleSideBar } />
                </nav>
                <section>
                    <Router>
                        <div className="container-fluid">
                            <div className="row position-relative">
                                {sidebar}
                                <div id="body" className="col-12 col-lg-9 p-0">
                                {/* <TodoList setListTitle={ this.setListTitle } /> */}
                                    <Switch>
                                        <Route path={`/:listId`}>
                                            <TodoList setListTitle={ this.setListTitle } />
                                        </Route>
                                        <Route path="/">
                                            <TodoList setListTitle={ this.setListTitle } />
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </Router>
                </section>
            </>
        );
    }
}

export default AppBaseStructure;