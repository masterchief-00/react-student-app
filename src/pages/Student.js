import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Student extends Component {
  state = {
    students: [],
    loading: true,
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:8000/api/students");
    if (res.status === 200) {
      this.setState({
        students: res.data.students,
        loading: false,
      });
    }
  }
  render() {
    var student_HTML_TABLE = "";

    if (this.state.loading) {
      student_HTML_TABLE = (
        <tr>
          <td colSpan={6}>
            <h2>Loading...</h2>
          </td>
        </tr>
      );
    } else {
      student_HTML_TABLE = this.state.students.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.course}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
              <Link
                to={`edit-student/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <Link
                to={`delete-student/${item.id}`}
                className="btn btn-danger btn-sm"
              >
                Delete
              </Link>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>Student Data</h1>
                <Link
                  to={"add-student"}
                  className="btn btn-primary btn-sm float-end"
                >
                  Add students
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{student_HTML_TABLE}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Student;
