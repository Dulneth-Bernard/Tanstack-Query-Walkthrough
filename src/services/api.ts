
import axios from "axios";

import { Todo } from "../types/todo";
import { Project } from "../types/project";
import { Product } from "../types/products";

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

//Edit toDo

export const updateTodo = async (data: Todo)=>{
    await axiosInstance.put(`todos/${data.id}`,data);

}

//delete todo

export const deleteTodo =  async (id: number)=>{
    await  axiosInstance.delete(`todos/${id}`);
}

//Paginated Queries

//Each page  give me 3 projects
export const getProjects =  async (page= 1)=>{
    return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
}
//Infinite Queries

export const getProducts = async ({pageParam} : {pageParam : number} )=>{
    //Perscroll limit to 3
    return  ((await axiosInstance.get<Product[]>(`products?_page=${pageParam +1 }&_limit=3`)).data);

}


//Get product by ids

export const getProduct =  async(id: number )=>{
    return (await axiosInstance.get<Product>(`products/${id}`)).data
}