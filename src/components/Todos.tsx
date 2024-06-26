import { SubmitHandler } from "react-hook-form";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutations";
import { useToDosIdS, useTodos } from "../services/queries";
import { Todo } from "../types/todo";
import { useForm } from "react-hook-form";
import { queryOptions } from "@tanstack/react-query";

export default function Todos(){

    const {register,handleSubmit} =  useForm<Todo>();
    
    
    //calling the useQuery function to fetch data
    const todoidQuery = useToDosIdS();

    //calling use useTodo query
    const todoQueries = useTodos(todoidQuery.data);
    
    //Create to do function being called
    const createTodoMutation = useCreateTodo();

    //Callign deleter query 
    const deleteTodoMutation = useDeleteTodo();
    
    //UPDATE TO DO FUNCION BEINGCALLED
    const updateTodoMutation = useUpdateTodo();
    
    //Create a handler
    const handlerCreateTodoSubmit: SubmitHandler<Todo> = (data)=>{
        createTodoMutation.mutate(data);
    }
    
    //update handler
    const handleUpdateTodosubmit =(data: Todo| undefined)=>{
        if (data){
            updateTodoMutation.mutate({...data,checked:true})
        }

    }

    //Delte handle
    //Use mutateAsync instead of mutate to get a promise which will resolve on success or throw on an error. This can for example be used to compose side effects.
    const handleDeleteTodo = async (id: number) =>{
        await  deleteTodoMutation.mutateAsync(id)
        console.log("Success");
        
    };
    //with asyncMutate ,when above mutation is odne we can do something whenever that mutations is done
    



    
    return(

        <>
        <form onSubmit={handleSubmit(handlerCreateTodoSubmit)}>
            <input placeholder="Title" {...register("title")}/>
            <br />
            <input placeholder="Description" {...register("description")}/>
            <br />
            <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "adding.."  : "create"} />
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
                    <div>
                        <button onClick={()=> handleUpdateTodosubmit(data)} disabled={data?.checked}>
                            {data?.checked ? 'done' : "Mark as done"}
                        </button>
                        {data && data.id && (
                            <button onClick={()=>{ handleDeleteTodo(data.id!)}}>
                            Delete
                        </button>

                        ) }
                        

                    </div>

                </li>
            
            ))}
        </ul>
       
    

           
        
        </>
    );

}