import React from 'react';
import AppHeader from './app-header.js';
import SideBar from './side-bar.js';

class AppBaseStructure extends React.Component {
    constructor() {
        super();
        this.state = {
            openSideBar: false
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

    render() {
        let sidebar = <SideBar />;
        if(!this.state.openSideBar && window.innerWidth<992) {
            sidebar='';
        }
        return (
            <>
                <nav>
                    <AppHeader toggleSideBar={ this.toggleSideBar } />
                </nav>
                <section>
                    <div className="container-fluid">
                        <div className="row position-relative">
                            {sidebar}
                            <div id="body" className="col-12 col-lg-9"></div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default AppBaseStructure;