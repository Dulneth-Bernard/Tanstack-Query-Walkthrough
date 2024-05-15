import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo } from "./api";

export function useCreateTodo(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:Todo)=> createTodo(data),

       


        //Intercept mutation in each lifecycle, useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle
        

        onMutate: ()=>{
            /// A mutation is about to happen
            console.log("Mutated");
            
        },

        onError:(error)=>{
            // // An error happened!
            console.log("Error" + error);
        },

        onSuccess:()=>{
            //successfull 
            console.log("data added successfully");  
        },

        onSettled: async (error) => {
            // Error or success... doesn't matter, always run at  end of mutation!
            if(error){
            console.log("setteld");
        }else{
            //Re fetch / revalidate the query if it is successfull to update ui
            //onSettle invalidate the todo query FROM FUNCTION USETODOiD IN QUERIES     to display on Ui 
           await  queryClient.invalidateQueries({queryKey: ["todos"]})
           //Revalidating queries is asynchronus

        }

        }



});
}

//When a successful postTodo mutation happens, we likely want all todos queries to get invalidated and possibly refetched to show the new todo item. To do this, you can use useMutation's onSuccess options and the client's invalidateQueries function:
