import React, { useEffect } from "react";
import "../../style/userTable.css";
import { User } from "../../classes/User";
import TARow from "./TARow";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import AddUserForm from "./AddUserForm";

const ManageTAs = () => {
  const [users, setUsers] = React.useState<Array<User>>([]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/users");
      const json = await res.json();
      console.log(json.users)

      const tas = json.users.filter(u => u.userType.includes('ta'));

      setUsers(tas);
    } catch (err) {
      console.log(err);
    }
  }; 

  useEffect(() => {
    // Load data
    fetchUserData();
  }, []);

  return (
    <div>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>All Teaching Assistants</h2> 
        </div>
        <div id="profTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Email</th>
                <th className="column2">First name</th>
                <th className="column3">Last name</th>
                <th className="column4">User Type</th>
                <th className="column4">Average Rating</th>
                <th className="column5">Rate (Out of 5)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, i: number) => {
                if (user) {
                  return <TARow key={i} user={user} fetchUserData={fetchUserData} />;
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageTAs;
