
import axios from "axios";

import { Todo } from "../types/todo";

const backend_URL = "http://localhost:8080";
const axiosInstance  =  axios.create({baseURL: backend_URL})



//Get all todo ids
export const getTodosIds = async () => {
    //Retreiving todo's ID [1,2,3,4]
    return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
  };
  

//Get todos by a id , 
export const getTodo =  async(id : number)=>{
    return (await axiosInstance.get<Todo[]>(`todo/${id}`)).data ;

}