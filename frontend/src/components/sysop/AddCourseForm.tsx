import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "../../style/userTable.css";

// Form that adds a course with fields

//declaring the states
const AddCourseForm = ({ fetchCourseData }) => {
  const [show, setShow] = React.useState(false);
  const [courseDesc, setCourseDesc] = React.useState("");
  const [courseNumber, setCourseNumber] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [year, setYear] = React.useState("");
  const [instructor, setInstructor] = React.useState("");
  const [rooms, setRooms] = React.useState([]);
  const [times, setTimes] = React.useState([]);
  const [resp, setResp] = React.useState("");
  const [wishlist, setWishlist] = React.useState([]);


  //function that adds the course to the database using a post request
  const handleAddCourse = async (e) => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseDesc: courseDesc,
          courseNumber: courseNumber,
          courseName: courseName,
          term: term,
          year: year,
          instructorEmail: instructor, 
          courseRooms: rooms, 
          courseTimes: times, 
          courseResp: resp,
          wishlist: wishlist
        }),
      });
      if (res.status === 201) {
        setTimeout(() => {
          fetchCourseData();
          setShow(false);
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon />
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>

            <Row>
              <Col>
                <Form.Control required type="courseNumber" placeholder="Please enter the course number." value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseName" placeholder="Please enter the course name." value={courseName} onChange={(e) => setCourseName(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseDesc" placeholder="Please enter the course description." value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="term" placeholder="Please enter the course term." value={term} onChange={(e) => setTerm(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="year" placeholder="Please enter the course year." value={year} onChange={(e) => setYear(e.target.value)} />
              </Col>
            </Row>
            
            <Row>
              <Col>
                <Form.Control required type="email" placeholder="Please enter Course Instructor's Email." value={instructor} onChange={(e) => setInstructor(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="resp" placeholder="Please enter Course Responsibilities" value={resp} onChange={(e) => setResp(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="rooms" placeholder="Please enter Course Rooms (comma seperated)" value={rooms} onChange={(e) => setRooms(e.target.value.split(','))} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="times" placeholder="Please enter Course Times (comma seperated)" value={times} onChange={(e) => setTimes(e.target.value.split(','))} />
              </Col>
            </Row>


            <Row>
              <Col>
                <Form.Control required type="wishlist" placeholder="Please enter TA names (comma seperated)" value={wishlist} onChange={(e) => setWishlist(e.target.value.split(','))} />
              </Col>
            </Row>

            
            <Button className="mt-3" variant="light" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCourseForm;
