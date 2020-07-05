import React, { Component } from 'react';
import './ListRow.css'

class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            des: props.des,
            id: props.id,
            isdone: props.isdone
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isdone !== newProps.isdone) {
            this.setState({ isdone: newProps.isdone });
        }
    }

    CheckDoneButton(id) {
        this.props.checkDone(id, this.state.isdone ? false : true);
    }

    SendDeleteMessage(id) {
        this.props.deleteWork(id);
    }

    render() {
        const ListRowField = (
            <div className="work-row">
                &nbsp;&nbsp;
                <input type="checkbox" checked={this.state.isdone} onChange={this.CheckDoneButton.bind(this, this.state.id)}></input>
                &nbsp; {this.state.des}
                <button type="button" className="btn btn-danger" onClick={this.SendDeleteMessage.bind(this, this.state.id)}>Delete</button>
                <hr></hr>
            </div>
        );

        return ListRowField;
    }
}

export default ListRow;