import { SubmitHandler } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useToDosIdS, useTodos } from "../services/queries";
import { Todo } from "../types/todo";
import { useForm } from "react-hook-form";

export default function Todos(){

    
    //calling the useQuery function to fetch data
    const todoidQuery = useToDosIdS();

    //calling use useTodo query
    const todoQueries = useTodos(todoidQuery.data);
    
    //Create to do function being called
    const createTodoMutation = useCreateTodo();
    
    //Create a handler
    const handlerCreateTodoSubmit: SubmitHandler<Todo> = (data)=>{
        createTodoMutation.mutate(data);
    }
    
    const {register,handleSubmit} =  useForm<Todo>();
    
    
    return(

        <>
        <form onSubmit={handleSubmit(handlerCreateTodoSubmit)}>
            <input placeholder="Title" {...register("title")}/>
            <br />
            <input placeholder="Description" {...register("description")}/>
            <br />
            <input type="submit" />
        </form>


        {/* Its going to fetch 1 by 1 in parallel , goof for performance, usefull for multiple queries you dont know how many   */}
        <ul>
            {todoQueries.map(({data})=>(
                <li key={data?.id}>
                    <div>id : {data?.id}</div>
                    <span>
                        <strong>Title: </strong> {data?.title}
                        <strong> Desc: </strong>{data?.description}

                    </span>

                </li>
            
            ))}
        </ul>
       
    

           
        
        </>
    );

}