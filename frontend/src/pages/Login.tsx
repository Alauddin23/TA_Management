import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.jpg";
import { UserContext } from "../App";
import Navbarx from "../components/Navbar";
import "../App.css";
import "../style/login.css";
import classImg from "../assets/images/class.png";
import star from "../assets/images/star.png";
import multi from "../assets/images/multi.png";
import sys from "../assets/images/sysop.webp";

const Login: React.FC = () => {
  // Load global state
  const { user, setUser } = useContext(UserContext);

  // Declare hooks
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState("");


  // on submit pass email and password values entered by user
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // error if empty email or password
    if (!email || !password) {
      // error if user does not enter username and/or password
      console.error("Please provide your username and password.");
      setError("Please provide your username and password.");
      return;
    }

    try {
      // Make login API call
      // CAUTION: Do not hardcode the URLs, instead use routers
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 200) {
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
    <div className="login">
      <Navbarx/>
      <div className="welcome">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <div style={{backgroundColor:"#ec1b30"}}><h2 style={{textAlign:"center", color:"white", padding:"5px", marginBottom:"30px"}}>Login</h2></div>
            <img className="logo" src={logo} alt="mcgill-logo" />

            <p className="top">Sign in with your email and password.</p>
            {error !== "" ? <div className="error"> * {error} </div> : ""}

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
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="sign-in-button">
              <input type="submit" value="Sign in" />
            </div>
            <p className="bottom">
            Don't have an account?  &nbsp;
              <Link className="links" to="/register">
                Register
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

export default Login;
