import {  useMutation,useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

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
            //When a successful postTodo mutation happens, we likely want all todos queries to get invalidated and possibly refetched to show the new todo item. To do this, you can use useMutation's onSuccess options and the client's invalidateQueries function:
            //Re fetch / revalidate the query if it is successfull to update ui
            //onSettle invalidate the todo query FROM FUNCTION USETODOiD IN QUERIES     to display on Ui 
           await  queryClient.invalidateQueries({queryKey: ["todos"]})
           //Revalidating queries is asynchronus

        }
        }

});
}

//update toDo hook

export function useUpdateTodo(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data:  Todo)=> updateTodo(data),

        onSettled: async (_,error,variables)=>{
            if(error){
                console.log(error);
                
            }
            else{
                //imvalidate all the queries
                await queryClient.invalidateQueries({queryKey: ['todos']})

                //invalidate the query with the id  to display in UI\
                await queryClient.invalidateQueries({queryKey: ['todo',{id: variables.id}]})
                //Variables are all properties/varaibels accessible by data
                //Genral rule of thumb keep dymic keys like ID in curley braces

            }
        }
        
    })

}

//Mutation for deletion

export function useDeleteTodo(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:number )=> deleteTodo(id),

        onSuccess: ()=>{
            console.log("Deleted succesffuly");
                
        },

        onSettled: async  (_,error)=>{
            if(error){
                console.log("Error " + error);
                
            }else{
                //Successfully deleted 
                //invalidate query to show the list without the dewlted id
                 await queryClient.invalidateQueries({queryKey: ["todos"]})

            }

        }
        

    });

}
