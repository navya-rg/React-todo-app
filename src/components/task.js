import React from "react";
import { tasks } from '../dummy-data.js';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: null,
            showInputBox: false,
            taskMessage: this.props.task.message,
            rerender: false,
        };
        this.toggleInputBox = this.toggleInputBox.bind(this);
        this.taskUpdateHandler = this.taskUpdateHandler.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
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

    toggleInputBox() {
        this.setState({showInputBox: !this.state.showInputBox});
    }

    taskUpdateHandler(event, taskId, listId) {
        if (event.key === 'Enter') {
            const taskMessage = event.target.value;
            tasks.map(function(task) { 
                if(task.id === taskId && task.listId === listId) {
                    task.message = taskMessage;
                }
                return task; 
            });
            this.setState({showInputBox: false});
        }
    }

    render() {
        let complete = '';
        let textStyle = { display: "inline-block"};
        if(this.props.task.isComplete) {
            complete = <i className="zmdi zmdi-check task-icon" onClick={() => this.toggleCompletion(this.props.task.id)}></i>
            textStyle.textDecoration = "line-through";
            textStyle.color =  "#6c757d";
        }
        else {
            complete = <i className="zmdi zmdi-circle-o task-icon" onClick={() => this.toggleCompletion(this.props.task.id)}></i>
        }
        let message = <span onClick={this.toggleInputBox}>{this.props.task.message}</span>;
        if(this.state.showInputBox) {
            message = <input type="text" className="invisible-textbox" onBlur={ this.toggleInputBox } defaultValue={this.props.task.message} onKeyPress={(ev) => this.taskUpdateHandler(ev, this.props.task.id, this.props.task.listId)} style={{color: "black"}} autoFocus />
        }
        return (
            <div className="row mt-3" key={this.props.task.id}>
                <div className="card task">
                    <div className="card-body row" style={{flexWrap: "nowrap"}}>
                        <div className="col-11 p-0" style={textStyle}>
                            { complete } &nbsp;
                            { message }
                        </div>
                        <div className="col-1" style={{textAlign: "end", paddingRight: "20px"}}><i className="zmdi zmdi-delete" onClick={() => this.props.deleteTask(this.props.task.id)}></i></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;