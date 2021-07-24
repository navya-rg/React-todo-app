import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
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
            listId: null,
            tasks: [],
            rerender: false,
            taskMessage: null,
        };
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    loadTodoList() {
        const listId = parseInt(window.location.pathname.replaceAll("/", ""), 10);
        axios.get(`http://localhost:8080/get-tasks/${listId}`)
        .then(response => {
            this.setState({tasks: response.data.res, listId: parseInt(window.location.pathname.replaceAll("/", ""), 10)});
        }); 
        axios.get(`http://localhost:8080/get-list/${listId}`)
        .then(response => {
            this.setState({list: response.data.res});
        });       
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

    toggleCompletion(id, isComplete) {
        axios.put(`http://localhost:8080/complete-task`, {id: id, isComplete: isComplete})
        .then(response => {
            this.loadTodoList();
        });
    }

    deleteTask(id) {
        axios.delete(`http://localhost:8080/delete-task/${id}`)
        .then(response => {
            this.loadTodoList();
        });
    }

    newTaskHandler(event) {
        this.setState({taskMessage: event.target.value});
        if (event.key === 'Enter') {
            const taskMessage = event.target.value;
            axios.post('http://localhost:8080/new-task', {listId: this.state.listId, message: taskMessage})
            .then(response => {
                event.target.value = '';
                this.setState({taskMessage: null});
                this.loadTodoList();
            });
        }
    }

    updateTask(id, message) {
        axios.put(`http://localhost:8080/update-task`, {id: id, message: message})
        .then(response => {
            this.loadTodoList();
        });
    }

    render() {
        var tasks;
        if(!this.state.tasks || this.state.tasks.length<=0) {
            tasks = (
                <div className="mt-3 no-items display-7">
                    No tasks found :(
                </div>
            );
        }
        else {
            tasks = this.state.tasks.map((task) => {
                return (
                    <Task task={task} key={task.id} deleteTask={this.deleteTask} toggleCompletion={this.toggleCompletion} updateTask={this.updateTask} />
                );
            })
        }
        return (
            <>
                <div className="container px-5" style={{height: "calc(100vh - (65px + 45.82px))", overflowY: "auto"}}>
                    <div className="row mt-3"></div>
                    {tasks}
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