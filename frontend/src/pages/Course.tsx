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

const Course: React.FC = () => {
  // Load global state
  let { id } = useParams();
  console.log(id);

  const [courseNumber, setCourseNumber] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [courseDesc, setCourseDesc] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [courseTAs, setCourseTAs] = useState([]);
  const [courseRooms, setCourseRooms] = useState([]);
  const [courseTimes, setCourseTimes] = useState([]);
  const [courseResp, setCourseResp] = useState<string>("");
  const [wishlist, setWishlist] = useState([]);

  React.useEffect(() => {
    const loadCourse = async () => {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/course/${id}`);
        const json = response.data;
        console.log(json);
        setCourseName(json.course.courseName);
        setCourseDesc(json.course.courseDesc);
        setCourseNumber(json.course.courseNumber);
        setYear(json.course.year);
        setTerm(json.course.term);
        setCourseTAs([...json.course.courseTAs]);
        setCourseResp(json.course.courseResp);
        setCourseRooms([...json.course.courseRooms]);
        setCourseTimes([...json.course.courseTimes]);
        setWishlist([...json.course.wishlist]);
    }
    loadCourse();
}, []);

  return (
    <div className="course">
        <Navbarx/>
        <h1>Course Page</h1>

        <h3>Course Number: {courseNumber}</h3>
        <h3>Course Name: {courseName}</h3>

        <Typography>Course Description: {courseDesc}</Typography>

        <h6>Term: {term}</h6>
        <h6>Year: {year}</h6>
        <h3>TAs:</h3>

        {courseTAs.map((t)=>{
           return (
               <div>
            <h5>Teaching Assistant:</h5>
           <Typography>First Name: {t.firstName}</Typography>
           <Typography>Last Name: {t.lastName}</Typography>
           <Typography>Email: {t.email}</Typography>

           </div>
           )
        })}


        <h3>Office hours and rooms:</h3>
        {courseTimes.map((t,index)=>{
           return (<div>
               <Typography>Time: {t} - Room: {courseRooms[index]}</Typography>
           </div>)
        })}

        <Typography>Course Responsibilities: {courseResp}</Typography>
        <h3>TA Wishlist: </h3>
        {wishlist.map(w=><Typography>{w}</Typography>)}

    </div>
  );
};

export default Course;
