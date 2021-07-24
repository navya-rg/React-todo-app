import React from "react";

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

    toggleInputBox() {
        this.setState({showInputBox: !this.state.showInputBox});
    }

    taskUpdateHandler(event, taskId) {
        if (event.key === 'Enter') {
            const taskMessage = event.target.value;
            this.props.updateTask(taskId, taskMessage);
            this.setState({showInputBox: false});
        }
    }

    render() {
        let complete = '';
        let textStyle = { display: "inline-block"};
        if(this.props.task.isComplete) {
            complete = <i className="zmdi zmdi-check task-icon" onClick={() => this.props.toggleCompletion(this.props.task.id, false)}></i>
            textStyle.textDecoration = "line-through";
            textStyle.color =  "#6c757d";
        }
        else {
            complete = <i className="zmdi zmdi-circle-o task-icon" onClick={() => this.props.toggleCompletion(this.props.task.id, true)}></i>
        }
        let message = <span onClick={this.toggleInputBox} style={textStyle}>{this.props.task.message}</span>;
        if(this.state.showInputBox) {
            message = <input type="text" className="invisible-textbox" onBlur={ this.toggleInputBox } defaultValue={this.props.task.message} onKeyPress={(ev) => this.taskUpdateHandler(ev, this.props.task.id)} style={{color: "black"}} autoFocus />
        }
        return (
            <div className="row mt-3" key={this.props.task.id}>
                <div className="card task">
                    <div className="card-body row" style={{flexWrap: "nowrap"}}>
                        <div className="col-11 p-0">
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