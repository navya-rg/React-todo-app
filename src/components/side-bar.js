import React from 'react';
import { Link } from "react-router-dom";
import { tempTodoLists } from '../dummy-data.js';

class SideBar extends React.Component {
    render() {
        var favList = tempTodoLists.filter(list => list.isStarred).map(function(list){
            return (<Link to={`/${list.id}`} key={list.id} className="text-dark text-decoration-none">
                <div className="sidebar-list-item row mx-0">
                    <div className="col-11 p-0">
                        {list.name}
                    </div>
                    <div className="col-1 p-0" style={{textAlign: "end"}}>
                        <i className="zmdi zmdi-star text-warning"></i>
                    </div>
                </div>
            </Link>);
        })
        var otherList = tempTodoLists.filter(list => !list.isStarred).map(function(list){
            return (<Link to={`/${list.id}`} key={list.id} className="text-dark text-decoration-none">
                <div className="sidebar-list-item row mx-0">
                    <div className="col-11 p-0">
                        {list.name}
                    </div>
                    <div className="col-1 p-0" style={{textAlign: "end"}}>
                        <i className="zmdi zmdi-star-outline text-muted"></i>
                    </div>
                </div>
            </Link>);
        })
        return (
            <div id="sidebar" className="col-12 col-lg-3 position-absolute position-lg-relative bg-light">
                <div className="display-7 mt-3 mb-2">Favourites</div>
                {favList}
                <div className="display-7 mt-3 mb-2">My todo lists</div>
                {otherList}
                <div className="sidebar-list-item text-center">
                    <i className="zmdi zmdi-plus text-muted"></i>
                </div>
            </div>
        );
    }
}

export default SideBar;