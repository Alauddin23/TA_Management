import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.jpg";
import { UserContext } from "../App";
import "../App.css";
import "../style/login.css";
import "../style/register.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import Navbarx from "../components/Navbar";
import { useParams } from "react-router";
import axios from "axios";
import { Typography } from '@mui/material';

const TA: React.FC = () => {
  // Load global state
  let { id } = useParams();
  console.log(id);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [courses, setCourses] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [rating, setRating] = useState();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  React.useEffect(() => {
    const loadTA = async () => {

        const response = await axios.get(
          `http://127.0.0.1:3000/api/users/${id}`);

        const json = response.data;
        setFirstName(json.user.firstName);
      setLastName(json.user.lastName);
      setEmail(json.user.email);
      setStudentID(json.user.studentID);
      setUsername(json.user.username);
      setSemester(json.user.semester);
      setCourses([...json.user.coursesRegistered]);
      setComments([...json.user.comments]);
      setRating(json.user.rating);

    }

    loadTA();
}, []);

console.log(courses);
  return (
    <div className = "ta">
      <Navbarx/>
      <div>

        <h3>Teaching Assistant Information</h3>

      <Typography>First Name: {firstName}</Typography>
      <Typography>Last Name: {lastName}</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Student ID: {studentID}</Typography>
      <Typography>Username: {username}</Typography>
      <Typography>Semester: {semester}</Typography>
      <Typography>
        Courses Registered:
        </Typography>
      <ul> {courses.map(c=> <li>{c}</li>)}</ul>

      <h3>Comments:</h3>

<ul>{comments.map(comment => <li> {comment}</li>)}</ul>

<h3>Rating: {rating}</h3>


</div>
    </div>
  );
};

export default TA;
