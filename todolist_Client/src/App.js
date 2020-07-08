import React, { Component } from "react";
import "./App.css";
import ListRow from "./Components/item/ListRow";
import { GetWorks, CheckDone, DeleteWork, GetWorkById, ChangeDescription, AddWork } from './Api/todoApi'

class App extends Component {
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
    CheckDone(id, isdone).then((res) => {
      this.GetData();
    }).catch(err => console.log(err));
  }

  GetData() {
    GetWorks().then((res) => {
      this.setState({
        list: res.data
      })
    }).catch(err => console.log(err));
  }

  DeleteWork = (id) => {
    DeleteWork(id).then(res => {
      this.GetData();
    }).catch(err => console.log(err));
  }

  EditWork = (id) => {
    document.getElementById('change-work-desciption-field').style.display = 'block';
    GetWorkById(id).then((res) => {
      document.getElementById('changeDescriptionInput').value = res.description;
    }).catch(err => console.log(err));

    this.setState({
      editWorkId: id
    })
  }

  UpdateWork(event) {
    let newDescription = document.getElementById('changeDescriptionInput').value;
    ChangeDescription(this.state.editWorkId, newDescription).then((res) => {
      this.GetData();
      document.getElementById('changeDescriptionInput').value = "";
      this.setState({
        editWorkId: ""
      })
      document.getElementById('change-work-desciption-field').style.display = 'none';
    }).catch(err => console.log(err));
    event.preventDefault();
  }

  CancelUpdate(event) {
    document.getElementById('changeDescriptionInput').value = "";
    this.setState({
      editWorkId: ""
    })
    document.getElementById('change-work-desciption-field').style.display = 'none';
    //refs
    event.preventDefault();
  }

  DescriptionChangeEvent = (event) => {
    this.setState({ description: event.target.value.toString() });
  };

  AddWorkEvent = (event) => {
    var this_App = this;
    if (this.state.description !== "") {
      AddWork(this.state.description).then(function (response) {
        this_App.GetData();
      }).catch(err => console.log(err));

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
        {/* End form add new work */}

        {/* List work field */}
        <div className="list-work-field">
          <span>TODO LIST</span>
          <hr></hr>
          <div className="list-work">{
            this.state.list.map((value, index) => {
              return (
                //item list
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
        {/* End list work field */}

        <br></br>

        {/* form edit work */}
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
        {/* End form edit work */}
      </div>
    );
  }
}

export default App;
