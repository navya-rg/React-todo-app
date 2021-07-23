import React from 'react';
import { tempTodoLists, tasks } from '../dummy-data.js';
import SideBarLink from './side-bar-link.js';

class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            showInputBox: false,
            rerender: false,
            newListName: null,
        };
        this.toggleInputBox = this.toggleInputBox.bind(this);
        this.newListHandler = this.newListHandler.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.toggleFavouriteList = this.toggleFavouriteList.bind(this);
    }

    toggleInputBox() {
        this.setState({showInputBox: !this.state.showInputBox});
    }

    newListHandler(event) {
        this.setState({newListName: event.target.value});
        if (event.key === 'Enter') {
            const newListName = event.target.value;
            const newId = Math.max.apply(Math, tempTodoLists.map(function(list) { return list.id; }))
            tempTodoLists.push({
                id: newId>0 ? (newId+1) : 1,
                name: newListName,
                isStarred: false
            });
            event.target.value = '';
            this.setState({newListName: null, showInputBox: false});
        }
    }

    deleteList(id) {
        const index = tempTodoLists.findIndex(list => list.id === id);
        tempTodoLists.splice(index, 1);
        let taskIndex = tasks.findIndex(task => task.listId === id);
        while (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            taskIndex = tasks.findIndex(task => task.listId === id);
        }
        this.setState({rerender: !this.state.rerender});
    }

    toggleFavouriteList(id) {
        tempTodoLists.map(function(list) { 
            if(list.id === id) {
                list.isStarred = !list.isStarred;
            }
            return list; 
        });
        this.setState({rerender: !this.state.rerender});
    }

    render() {
        const favouriteLists = tempTodoLists.filter(list => list.isStarred);
        var favList = favouriteLists.map((list) => {
            return (
                <SideBarLink list={list} deleteList={this.deleteList} toggleFavouriteList={this.toggleFavouriteList} key={list.id} />
            );
        })
        if(favouriteLists.length<=0) {
            favList = (
                <div class="mx-0 display-7 no-items">
                    No favourite lists :(
                </div>
            );
        }
        var otherList = tempTodoLists.filter(list => !list.isStarred).map((list) => {
            return (
                <SideBarLink list={list} deleteList={this.deleteList} toggleFavouriteList={this.toggleFavouriteList} key={list.id} />
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