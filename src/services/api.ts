
import axios from "axios";

import { Todo } from "../types/todo";

const backend_URL = "http://localhost:8080";
const axiosInstance  =  axios.create({baseURL: backend_URL})


// Queries - getting from server
//Get all todo ids
export const getTodosIds = async () => {
    //Retreiving todo's ID [1,2,3,4]
    return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
  };
  

//Get todos by a id , 
export const getTodo =  async(id : number)=>{
    return (await axiosInstance.get<Todo[]>(`todos/${id}`)).data ;

}

//Mutations - updating,  used to create/update/delete data or perform server side-effects. 

export const createTodo = async (data: Todo)=>{
    //Tanstack LIBRARY IS SMART TO HANDLE ERROR,SUCCESS states
    await axiosInstance.post<Todo>("todos",data);

}