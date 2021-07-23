import React from "react";
import { withRouter } from "react-router-dom";
import { tempTodoLists, tasks } from '../dummy-data.js';
import Task from './task.js';

function setWidthOfNewTaskInput() {
    let task = document.getElementsByClassName("task");
    if(task && task.length>0) {
        task = task[0];
        let newTask = document.getElementsByClassName("new-task");
        if(newTask && newTask.length>0) {
            newTask = newTask[0];
            newTask.setAttribute("style","width:"+task.clientWidth+"px");
        }
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            listId: null,
            rerender: false,
            taskMessage: null,
        };
        this.deleteTask = this.deleteTask.bind(this);
    }

    loadTodoList() {
        const listId = parseInt(window.location.pathname.replaceAll("/", ""), 10);
        const list = tempTodoLists.find(list => list.id === listId);
        this.setState({list: list, listId: parseInt(window.location.pathname.replaceAll("/", ""), 10)});
        // const list = tempTodoLists.find(l => l.id === this.state.listId);
        // if(list) {
        //     this.props.setListTitle(list.name);
        // }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.loadTodoList();
            setWidthOfNewTaskInput();
        });   
    }

    componentDidUpdate() {
        setWidthOfNewTaskInput();
    }

    toggleCompletion(id) {
        tasks.map(task => {
            if(task.id===id) {
                task.isComplete = !task.isComplete;
            }
            return task;
        })
        this.setState({rerender: !this.state.rerender});
    }

    deleteTask(id) {
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        this.setState({rerender: !this.state.rerender});
    }

    newTaskHandler(event) {
        this.setState({taskMessage: event.target.value});
        if (event.key === 'Enter') {
            const taskMessage = event.target.value;
            const newId = Math.max.apply(Math, tasks.filter(task => task.listId === this.state.listId).map(function(task) { return task.id; }))
            tasks.push({
                id: newId>0 ? (newId+1) : 1,
                listId: this.state.listId,
                message: taskMessage,
                isComplete: false,
                lastUpdatedDate: new Date(),
                creationDate: new Date(),
            });
            event.target.value = '';
            this.setState({taskMessage: null});
        }
    }

    render() {
        const tasksInList = tasks.filter(task => task.listId === this.state.listId);
        var list = tasksInList.map((task) => {
            return (
                <Task task={task} key={task.id} deleteTask={this.deleteTask} />
            );
        })
        if(tasksInList.length<=0) {
            list = (
                <div className="mt-3 no-items display-7">
                    No tasks found :(
                </div>
            );
        }
        return (
            <>
                <div className="container px-5" style={{height: "calc(100vh - (65px + 45.82px))", overflowY: "auto"}}>
                    <div className="row mt-3"></div>
                    {list}
                    <div className="row" style={{height: "85px"}}></div>
                </div>
                <div className="container px-5">
                    <div className="row">
                        <div className="card new-task" >
                            <div className="card-body">
                                <i className="zmdi zmdi-plus text-white ml-3"></i> &nbsp;
                                <input type="text" className="invisible-textbox" placeholder={this.state.list ? ("Add new task to '"+this.state.list.name+"'") : "Add new task"} onKeyPress={(ev) => this.newTaskHandler(ev)} autoFocus />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(TodoList);