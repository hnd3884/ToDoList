import React, { Component } from "react";
import "./App.css";
import ListRow from "./ListWork/ListRow";

class App extends Component {
  countWork = 0;

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      list: [],
      editWorkId: ""
    };
    this.GetData();
  }

  CheckDone = (id, isdone) => {
    fetch(`http://localhost:8081/check-work?id=${id}&isdone=${isdone}`, {
      method: 'PUT'
    }).then((res) => {
      this.GetData();
    })
  }

  GetData() {
    fetch('http://localhost:8081/get-works')
      .then(result => result.json())
      .then((res) => {
        this.setState({
          list: res.data
        })
      })
  }

  DeleteWork = (id) => {
    //alert(id);
    fetch('http://localhost:8081/delete-work', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id
      })
    }).then(res => {
      this.GetData();
    })
  }

  EditWork = (id) => {
    //alert(id);
    document.getElementById('change-work-desciption-field').style.display = 'block';
    fetch('http://localhost:8081/get-work?id=' + id)
      .then(result => result.json())
      .then((res) => {
        document.getElementById('changeDescriptionInput').value = res.description;
      })

    this.setState({
      editWorkId: id
    })
  }

  UpdateWork(event) {
    // console.log(this.state.editWorkId);
    // console.log(document.getElementById('changeDescriptionInput').value);
    let newDescription = document.getElementById('changeDescriptionInput').value;
    fetch(`http://localhost:8081/update-work?id=${this.state.editWorkId}&newDescription=${newDescription}`, {
      method: 'PUT'
    }).then((res) => {
      this.GetData();
      document.getElementById('changeDescriptionInput').value = "";
      this.setState({
        editWorkId: ""
      })
      document.getElementById('change-work-desciption-field').style.display = 'none';
    })
    event.preventDefault();
  }

  CancelUpdate(event) {
    document.getElementById('changeDescriptionInput').value = "";
    this.setState({
      editWorkId: ""
    })
    document.getElementById('change-work-desciption-field').style.display = 'none';
    event.preventDefault();
  }

  DescriptionChangeEvent = (event) => {
    this.setState({ description: event.target.value.toString() });
  };

  AddWorkEvent = (event) => {
    var this_App = this;
    if (this.state.description !== "") {
      fetch('http://localhost:8081/add-work', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isdone: false,
          description: this.state.description
        })
      }).then(function (response) {
        this_App.GetData();
      });

      document.getElementById("add-work-form").reset();
    } else {
      alert("none description input");
    }

    event.preventDefault();
  };

  render() {
    return (
      <div className="cont">
        {/* Form add new work */}
        <div className="add-work-field">
          <div className="form-group">
            <form id="add-work-form">
              <input
                placeholder="What needs to be done?"
                className="form-control"
                onChange={this.DescriptionChangeEvent}
              >
              </input>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.AddWorkEvent}
              >
                <i className="fa fa-plus-square-o" aria-hidden="true"></i>&nbsp;
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="list-work-field">
          <span>TODO LIST</span>
          <hr></hr>
          <div className="list-work">{
            this.state.list.map((value, index) => {
              return (
                <ListRow
                  isdone={value.isdone}
                  des={value.description}
                  id={value._id}
                  key={value._id}
                  deleteWork={this.DeleteWork}
                  editWork={this.EditWork}
                  checkDone={this.CheckDone}
                ></ListRow>
              )
            })
          }</div>
        </div>
        <br></br>
        <div id="change-work-desciption-field" style={{ display: 'none' }}>
          <span>EDIT</span>
          <form id="change-work-desciption-form">
            <input className="form-control" id="changeDescriptionInput"></input>
            <button className="btn btn-primary" type="submit" onClick={(e) => this.UpdateWork(e)}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </button>
            <button className="btn btn-danger" type="submit" onClick={this.CancelUpdate.bind(this)}>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
