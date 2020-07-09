import React, { Component } from 'react';
import './WorkRow.css'

class WorkRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            des: props.des,
            id: props.id,
            isdone: props.isdone
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.state.isdone !== newProps.isdone) {
            this.setState({ isdone: newProps.isdone });
        }
        if (this.state.des !== newProps.des) {
            this.setState({ des: newProps.des });
        }
    }

    CheckDoneButton(id) {
        this.props.checkDone(id, this.state.isdone ? false : true);
    }

    DeleteWork(id) {
        this.props.deleteWork(id);
    }

    EditWork(id){
        this.props.editWork(id);
    }

    render() {
        var renderFormat = (this.state.isdone ? (<del>{this.state.des}</del>) : (this.state.des));
        const ListRowField = (
            <div className="work-row">
                &nbsp;&nbsp;
                <input type="checkbox" checked={this.state.isdone} onChange={this.CheckDoneButton.bind(this, this.state.id)}></input>
                &nbsp; {renderFormat}
                <button type="button" className="btn btn-primary" onClick={this.EditWork.bind(this, this.state.id)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                &nbsp;
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.DeleteWork.bind(this, this.state.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <hr></hr>
            </div>
        );

        return ListRowField;
    }
}

export default WorkRow;