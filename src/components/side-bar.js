import React from 'react';
import axios from 'axios';
import SideBarLink from './side-bar-link.js';

class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            showInputBox: false,
            rerender: false,
            newListName: null,
            allLists: [],
        };
        this.toggleInputBox = this.toggleInputBox.bind(this);
        this.newListHandler = this.newListHandler.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.toggleFavouriteList = this.toggleFavouriteList.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        this.getAllLists();
    }

    toggleInputBox() {
        this.setState({showInputBox: !this.state.showInputBox});
    }

    getAllLists() {
        axios.get('http://localhost:8080/get-all-lists')
        .then(response => {
            this.setState({allLists: response.data.res});
        });
    }

    newListHandler(event) {
        this.setState({newListName: event.target.value});
        if (event.key === 'Enter') {
            const newListName = event.target.value;
            axios.post('http://localhost:8080/new-list', {name: newListName})
            .then(response => {
                event.target.value = '';
                this.setState({newListName: null, showInputBox: false});
                this.getAllLists();
            }); 
        }
    }

    deleteList(id) {
        axios.delete(`http://localhost:8080/delete-list/${id}`)
        .then(response => {
            this.getAllLists();
        });
    }

    toggleFavouriteList(id, isStarred) {
        axios.put(`http://localhost:8080/star-list`, {id: id, isStarred: isStarred})
        .then(response => {
            this.getAllLists();
        });
    }

    updateList(id, name) {
        axios.put(`http://localhost:8080/update-list`, {id: id, name: name})
        .then(response => {
            this.getAllLists();
        });
    }

    render() {
        const favouriteLists = this.state.allLists.filter(list => list.isStarred);
        var favList = favouriteLists.map((list) => {
            return (
                <SideBarLink list={list} deleteList={this.deleteList} toggleFavouriteList={this.toggleFavouriteList} updateList={this.updateList} key={list.id} />
            );
        })
        if(favouriteLists.length<=0) {
            favList = (
                <div className="mx-0 display-7 no-items">
                    No favourite lists :(
                </div>
            );
        }
        var otherList = this.state.allLists.filter(list => !list.isStarred).map((list) => {
            return (
                <SideBarLink list={list} deleteList={this.deleteList} toggleFavouriteList={this.toggleFavouriteList} updateList={this.updateList} key={list.id} />
            );
        })
        var newList = (
            <div className="sidebar-list-item text-center" onClick={ this.toggleInputBox } >
                <i className="zmdi zmdi-plus text-muted"></i>
            </div>
        );
        if(this.state.showInputBox) {
            newList = (
                <div className="sidebar-list-item" >
                    <i className="zmdi zmdi-plus text-muted"></i> &nbsp;
                    <input type="text" className="invisible-textbox" onBlur={ this.toggleInputBox } placeholder="Add new list" onKeyPress={(ev) => this.newListHandler(ev)} style={{color: "black"}} autoFocus />
                </div>
            );
        }
        return (
            <div id="sidebar" className="col-12 col-lg-3 position-absolute position-lg-relative bg-light">
                <div className="display-7 mt-3 mb-2">Favourites</div>
                {favList}
                <div className="display-7 mt-3 mb-2">My todo lists</div>
                {otherList}
                {newList}
            </div>
        );
    }
}

export default SideBar;