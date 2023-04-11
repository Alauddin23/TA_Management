import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import StarIcon from "@material-ui/icons/Star";
import "../../style/userTable.css";
import { User } from "../../classes/User";
import { UserTypes } from "../../enums/UserTypes";
import axios from "axios";

const UserRow = ({ user, fetchUserData }: { user: User; fetchUserData: Function }) => {
  const [show, setShow] = useState(false);


  
  const handleDeleteUser = async() => {
    try {
     await axios.delete(`http://127.0.0.1:3000/api/users/${user._id}`);
    } catch (e) { 
      console.log(e)
    }
  };


  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary" onClick={handleDeleteUser}>
          <RemoveIcon />
        </button>
      </td>
      <td className="column1">{user.email}</td>
      <td className="column2">{user.firstName}</td>
      <td className="column3">{user.lastName}</td>
      <td className="column5">{user.userType.join(", ")}</td>

    </tr>
  );
};

export default UserRow;
