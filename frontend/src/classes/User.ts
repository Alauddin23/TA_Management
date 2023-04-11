import { UserTypes } from "../enums/UserTypes";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypes[];
  coursesRegistered: Array<string>,
  semester: string, 
  studentID:string, 
  username:string, 
  rating: Number
}

export const emptyUser: User = { firstName: "", lastName: "", email: "", userType: [], 
coursesRegistered: [],
semester: "", 
username:"",
rating: 0,
studentID: "",
_id: ""
};
