import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.jpg";
import { UserContext } from "../App";
import "../App.css";
import "../style/login.css";
import "../style/register.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import Navbarx from "../components/Navbar";
import classImg from "../assets/images/class.png";
import star from "../assets/images/star.png";
import multi from "../assets/images/multi.png";
import sys from "../assets/images/sysop.webp";


const Register: React.FC = () => {
  // Load global state
  const { user, setUser } = useContext(UserContext);

  // Declare hooks
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userTypes, setUserTypes] = useState<string[]>([]);
  const [studentID, setStudentID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [courses, setCourses] = useState<string[]>([]);

  const navigate = useNavigate();
  const [error, setError] = useState("");


  function handleCheckbox(e) {
    let existingUserTypes = [...userTypes];
    if (e.target.checked) {
        existingUserTypes.push(e.target.value);
        setUserTypes(existingUserTypes);
    } else {
        const index = existingUserTypes.indexOf(e.target.value);
        existingUserTypes.splice(index, 1);
        setUserTypes(existingUserTypes);
    }
    console.log(userTypes);
  }

  // on submit pass email and password values entered by user
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // error if empty email or password
    if (!email || !password || !firstName || !lastName || !userTypes) {
      // error if user does not enter username and/or password
      console.error("Please provide all your credentials.");
      setError("Please provide all your credentials.");
      return;
    }

    try {
      // Make login API call
      // CAUTION: Do not hardcode the URLs, instead use routers
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              firstName:firstName,
              lastName:lastName,
            email: email,
            password: password,
            userType:userTypes,
            username:username,
            coursesRegistered:courses,
            semester:semester,
            studentID:studentID,
            comments: [],
            rating:0
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 201) {
        const result = await res.json();
        // set user state
        setUser(result);
        navigate("/dashboard");
        return;
      } else {
        // error unable to login, invalid username or password
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbarx/>
      <div className="welcome">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
          <div style={{backgroundColor:"#ec1b30"}}><h2 style={{textAlign:"center", color:"white", padding:"5px", marginBottom:"30px"}}>Register</h2></div>
            <img className="logo" src={logo} alt="mcgill-logo" />

            <p className="top">Register with your email and password.</p>
            {error !== "" ? <div className="error"> * {error} </div> : ""}


             <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>


            <div className="form-group">

              <input
                type="text"
                name="email"
                placeholder="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="form-group">
              <input
                type="text"
                name="studentID"
                placeholder="student ID"
                id="studentID"
                onChange={(e) => setStudentID(e.target.value)}
              />
            </div>


            <div className="form-group">
              <input
                type="username"
                name="username"
                placeholder="Username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

          
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <div className="form-group">
              <input
                type="semester"
                name="semester"
                placeholder="Semester"
                id="semester"
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="courses"
                placeholder="Enter Courses Registered (comma seperated)"
                id="userType"
                onChange={(e) => setCourses(e.target.value.split(','))}
              />
            </div>

            <div >
              <Col>
              <p>Select User(s):</p>
              <Form.Check inline type="checkbox" label="Student" value="stud" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Professor" value="prof" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="TA" value="ta" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Admin" value="admin" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Sysop" value="sysop" onChange={handleCheckbox}/>
              </Col>
            </div>

            {console.log(courses)}


            <div className="sign-in-button">
              <input type="submit" value="Register" />
            </div>

            <p className="bottom">
            Already have an account?  &nbsp;
              <Link className="links" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>



        <h1 className="start">myTAs - McGill's TA Management System</h1>
        <h2>Easily manage your TAs and course assignments.</h2>
        <img width="300" height="300" src = {classImg}></img>
        <p>
          Our system makes it simple to assign TAs to courses, track their hours,
          and communicate with them.
        </p>


        <h2 style={{marginTop:"50px"}}>Features</h2>


        <div className="features">

        <div className="feature">
          <img height="100" width="100" src={star} alt="Rating"/>
          <h3>Rate my TA</h3>
          <p>
            Students can easily rate their TAs.
          </p>
        </div>
        <div className="feature">
          <img height="100" width="100" src={multi} alt="Communication icon" />
          <h3>Multi-Account Support</h3>
          <p>
            Users can create multiple accounts: eg. A user can be both a TA and a student.
          </p>
        </div>
        <div className="feature">
          <img height="100" width="100" src={sys} alt="Reports icon" />
          <h3>Sysop Privileges</h3>
          <p>
            Manage and keep track of all the user accounts.
          </p>
        </div>
      </div>




      </div>
    </div>
  );
};

export default Register;
