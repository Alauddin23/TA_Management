import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import StarIcon from "@material-ui/icons/Star";
import "../../style/userTable.css";
import { User } from "../../classes/User";
import { UserTypes } from "../../enums/UserTypes";
import Rating from '@mui/material/Rating';
import { Link, useNavigate } from "react-router-dom";


const TARow = ({ user, fetchUserData }: { user: User; fetchUserData: Function }) => {
  const [show, setShow] = useState(false);
  const [rating , setRating] = useState(0);
  const [comment, setComment] = useState("");

  console.log(user);


  const rateUser = async (user)=>{
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username:user.username,
              prevRating: user.rating,
              newRating: rating
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 201) {
        const result = await res.json();
        return;
      } else {
      }
    } catch (error) {
      console.error(error);
    }

  }

  const commentUser = async (user)=>{
    try {
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username:user.username,
              prevComments: user.comments,
              newComment: comment
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 201) {
        const result = await res.json();
        return;
      } else {
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <tr className="body">
      <td className="column0">
      </td>
      <td className="column1">{user.email}</td>
      <td className="column2">{user.firstName}</td>
      <td className="column3">{user.lastName}</td>
      <td className="column5">{user.userType.join(", ")}</td>
      <td className="column6">  <b>{user.rating} / 5 </b>     </td>
      <Rating name="size-medium" defaultValue={0} 
      onChange={(event, newValue) => {
        setRating(Number(newValue));
      }} 
         />
      <button className="btn btn-secondary" onClick={()=>{rateUser(user)}}>
        Rate
        </button>


<input style={{border:"1px solid red"}} type="text" onChange = {(e)=>{setComment(e.target.value)}} />
        <button className="btn btn-secondary" onClick={()=>{commentUser(user)}}>
        Comment
        </button>

<Link to ={`/ta/${user._id}`} target="_blank" >Profile</Link>


    </tr>
  );
};

export default TARow;
