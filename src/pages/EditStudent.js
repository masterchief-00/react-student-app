import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [errorList,setErrorList]=useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://studentmanager-api.herokuapp.com/api/edit-student/${id}`,
        { name, email, course, phone }
      );

      if (res.data.status === 200) {
        setName(res.data.student.name);
        setEmail(res.data.student.email);
        setCourse(res.data.student.course);
        setPhone(res.data.student.phone);
      } else if (res.data.status === 404) {
        swal({
          title: "Not Found!",
          text: res.data.message,
          icon: "warning",
          button: "Ok",
        });

        navigate("/");
      }
    };

    fetchData();
  }, [id]);

  const updateStudent = async (e) => {
    e.preventDefault();

    document.getElementById("update-btn").disabled = true;
    document.getElementById("update-btn").innerHTML = "Updating...";

    const res = await axios.put(
      `https://studentmanager-api.herokuapp.com/api/update-student/${id}`,
      { name, email, course, phone }
    );
    if (res.data.status === 200) {
      swal({
        title: "Done!",
        text: res.data.message,
        icon: "success",
        button: "Ok",
      });

      document.getElementById("update-btn").disabled = false;
      document.getElementById("update-btn").innerHTML = "Update";

      navigate("/");
    } else if (res.data.status === 404) {
      swal({
        title: "Not Found!",
        text: res.data.message,
        icon: "warning",
        button: "Ok",
      });

      navigate("/");
    }
    else{
      setErrorList(res.data.validate_error);
      document.getElementById("update-btn").disabled = false;
      document.getElementById("update-btn").innerHTML = "Update";
    }
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "course") {
      setCourse(e.target.value);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1>Edit student</h1>
              <Link to={"/"} className="btn btn-primary btn-sm float-end">
                View All
              </Link>
            </div>
            <div className="card-body">
              <form onSubmit={updateStudent}>
                <div className="form-group mb-3">
                  <label htmlFor="">Student Name:</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={name}
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.name}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Course:</label>
                  <input
                    type="text"
                    name="course"
                    onChange={handleInput}
                    value={course}
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.course}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={email}
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleInput}
                    value={phone}
                    className="form-control"
                  />
                  <span className="text-danger">{errorList.phone}</span>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    id="update-btn"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
