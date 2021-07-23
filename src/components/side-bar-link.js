import React from 'react';
import { Link } from "react-router-dom";
import { tempTodoLists } from '../dummy-data.js';

class SideBarLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
            showInputBox: false,
        };
        this.collapseOptions = this.collapseOptions.bind(this);
        this.expandOptions = this.expandOptions.bind(this);
        this.toggleInputBox = this.toggleInputBox.bind(this);
        this.listUpdateHandler = this.listUpdateHandler.bind(this);
    }

    collapseOptions() {
        this.setState({showOptions: false});
    }

    expandOptions() {
        this.setState({showOptions: true});
    }

    toggleInputBox() {
        this.setState({showInputBox: !this.state.showInputBox});
    }

    listUpdateHandler(event, id) {
        if (event.key === 'Enter') {
            const listName = event.target.value;
            tempTodoLists.map(function(list) { 
                if(list.id === id) {
                    list.name = listName;
                }
                return list; 
            });
            this.setState({showInputBox: false});
        }
    }

    render() {
        let star = <i className="zmdi zmdi-star-outline" onClick={() => this.props.toggleFavouriteList(this.props.list.id)}></i>
        if(this.props.list.isStarred) {
            star = <i className="zmdi zmdi-star" onClick={() => this.props.toggleFavouriteList(this.props.list.id)}></i>
        }
        let options = '';
        if(this.state.showOptions) {
            options = (
                <div className="sidebar-list-item-options">
                    { star } &nbsp;
                    <i className="zmdi zmdi-edit" onClick={this.toggleInputBox}></i> &nbsp;
                    <i className="zmdi zmdi-delete" onClick={() => this.props.deleteList(this.props.list.id)}></i>
                </div>
            );
        }
        let name = this.props.list.name;
        if(this.state.showInputBox) {
            name = <input type="text" className="invisible-textbox" onBlur={ this.toggleInputBox } defaultValue={this.props.list.name} onKeyPress={(ev) => this.listUpdateHandler(ev, this.props.list.id)} style={{color: "black"}} autoFocus />
        }
        return (
            <Link to={`/${this.props.list.id}`} key={this.props.list.id} className="text-dark text-decoration-none">
                <div className="sidebar-list-item row mx-0">
                    <div className="col-10 p-0">
                        {name}
                    </div>
                    <div className="col-2 p-0" style={{textAlign: "end"}}>                            
                            <div className="dropDownMenu position-relative d-inline" tabIndex="0" onBlur={ this.collapseOptions } >
                                <div className="currentValue" onClick={this.expandOptions}>
                                    <i className="zmdi zmdi-more-vert"></i>
                                </div>
                                {options}
                            </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default SideBarLink;