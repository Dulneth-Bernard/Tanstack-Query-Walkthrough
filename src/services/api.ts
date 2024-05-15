
import axios from "axios";

import { Todo } from "../types/todo";

const backend_URL = "http://localhost:8080";
const axiosInstance  =  axios.create({baseURL: backend_URL})



export const getTodosIds = async () => {
    //Retreiving todo's ID [1,2,3,4]
    return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
  };
  