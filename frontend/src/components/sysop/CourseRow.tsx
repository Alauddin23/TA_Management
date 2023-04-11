import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../../classes/Course";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseRow = ({ course, fetchCourseData }: { course: Course; fetchCourseData: Function }) => {

  //states
const [addEmail, setAddEmail] = React.useState("");
const [removeEmail, setRemoveEmail] = React.useState("");


//delete the course
  const handleDeleteCourse = async() => {
    try {
      console.log(course);
      await axios.delete(`http://127.0.0.1:3000/api/course/${course._id}`);
     } catch (e) { 
       console.log(e)
     }
  };

  //add TA to the course by email
  const addTA = async()=>{
    try{
      const res = await fetch(
        "http://127.0.0.1:3000/api/course/addta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              courseName:course.courseName,
              taEmail:addEmail
          }),
        }
      );
      if (res.status === 201) {
        const result = await res.json();
        return;
      } else {
      }
    }
    catch(er){
      console.log(er);
    }
  }

  //remove a TA from the course using email
  const removeTA = async()=>{
    try{
      const res = await fetch(
        "http://127.0.0.1:3000/api/course/removeta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              courseName:course.courseName,
              taEmail:removeEmail
          }),
        }
      );
      if (res.status === 201) {
        const result = await res.json();
        return;
      } else {
      }
    }
    catch(er){
      console.log(er);
    }
  }

  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary" onClick={handleDeleteCourse}>
          <RemoveIcon />
        </button>
      </td>
      <td className="column1">{course.courseNumber}</td>
      <td className="column2">{course.courseName}</td>
      <td className="column3">{course.courseDesc}</td>
      <td className="column4">{course.term}</td>
      <td className="column5">{course.year}</td>
      <td className="column6">{course.instructorName}</td>
      <td className="column7">
        <input onChange={(e)=>{
          //changing state of addEmail
          setAddEmail(e.target.value);
        }} placeholder="enter TA email" style={{border:"1px solid red"}} type="text"></input>

        <button onClick={addTA}>Add</button>
      </td>
      <td className="column8">
      <input onChange={(e)=>{
  //changing state of removeEmail
  setRemoveEmail(e.target.value);
      }} placeholder="enter TA email" style={{border:"1px solid red"}} type="text"></input>

        <button onClick={removeTA}>Remove</button>
      </td>

      <Link to ={`/course/${course._id}`} target="_blank" >Select</Link>

    </tr>
  );
};

export default CourseRow;
