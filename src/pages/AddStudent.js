import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { withRouter } from "./WithRouter";

class AddStudent extends Component {
  state = {
    name: "",
    course: "",
    email: "",
    phone: "",
    error_list: [],
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveStudent = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8000/api/add-student",
      this.state
    );
    if (res.data.status === 200) {

      swal({
        title: "Done!",
        text: res.data.message,
        icon: "success",
        button: "Ok",
      });
      
      this.props.navigate('/');

      this.setState({
        name: "",
        course: "",
        email: "",
        phone: "",
      });
    } else {
      this.setState({
        error_list: res.data.validate_error,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1>Add student</h1>
                <Link to={"/"} className="btn btn-primary btn-sm float-end">
                  View All
                </Link>
              </div>
              <div className="card-body">
                <form onSubmit={this.saveStudent}>
                  <div className="form-group mb-3">
                    <label htmlFor="">Student Name:</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleInput}
                      value={this.state.name}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.error_list.name}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Course:</label>
                    <input
                      type="text"
                      name="course"
                      onChange={this.handleInput}
                      value={this.state.course}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.error_list.course}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email:</label>
                    <input
                      type="email"
                      name="email"
                      onChange={this.handleInput}
                      value={this.state.email}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.error_list.email}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={this.handleInput}
                      value={this.state.phone}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.error_list.phone}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <button className="btn btn-primary " type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddStudent);
